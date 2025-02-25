<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, watch, defineProps, onMounted, inject } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useDropzone } from 'vue3-dropzone';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';

const swal = inject("$swal");

const props = defineProps({
    orders: {
        type: Array,
        required: true
    },
    files: {
        type: Array,
        required: true
    }
});

const form = ref({
    processing: false,
    name: '',
    description:'',
    files: [],
});

const formRejectedFiles = ref([]);
const formAcceptedFiles = ref([]);
const responseMessage = ref("");
const isDragActive = ref(false);
const formNameError = ref(false);
const formDescriptionError = ref(false);
const formFilesError = ref(false);
let triedToSubmit = false;
const uploadProgress = ref({});



onMounted(() => {
    $('.uploadedFileToggle').click(function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).parent().parent().find('.uploadedFilesUl').slideUp();
            $(this).text("Show files")
        } else {
            $(this).addClass('open');
            $(this).parent().parent().find('.uploadedFilesUl').slideDown();
            $(this).text("Hide files")
        }
    });
});

const saveFiles = (submittedform, createOrderID) => {
    let files = submittedform.files;

    files.forEach((file) => {
        const formData = new FormData(); // Create a new FormData instance for each file
        formData.append("orderId", createOrderID);
        formData.append("uploadedFiles[]", file); // Append only the current file

        uploadProgress.value[file.id] = 0; // Initialize progress for each file

        axios.post('/api/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable
                    ? progressEvent.total
                    : progressEvent.target.getResponseHeader('content-length') ||
                    progressEvent.target.getResponseHeader('x-decompressed-content-length');

                if (totalLength !== null) {
                    const progress = Math.round((progressEvent.loaded * 100) / totalLength);
                    uploadProgress.value[file.id] = progress; // Track progress for each file
                }
            }
        })
            .then((response) => {
                console.log(response.data);
                file.status = 'uploaded'


                if (files.every(f => f.status === 'uploaded')) {
                    // swal.fire({
                    //     position: "top-end",
                    //     icon: "success",
                    //     title: "Upload Complete",
                    //     text: "All files have been uploaded successfully!",
                    //     // timer: 1500,
                    //     showConfirmButton: false,
                    //     backdrop: `rgba(0,0,0,0)`
                    // }).then((result) => {
                    //     window.location.reload();
                    // });

                    form.value.status = "done";
                    $('.hideOnDone').slideUp()
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000)
                }

            })
            .catch((err) => {
                console.log(err);
                responseMessage.value = err.response?.data?.message === "The uploaded files field is required."
                    ? "Please choose files to upload."
                    : err.response?.data?.message;
                uploadProgress.value[file.id] = 0; // Reset progress for failed uploads
            });
    });
};

const createNewOrder = (submittedform) => {
    let orderName = submittedform.name;
    let orderDescription = submittedform.description;
    const formData = new FormData();
    formData.append("orderName", orderName);
    formData.append("orderDescription", orderDescription);
    axios.post('/api/create-order', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
        .then((response) => {
            let createdOrderID = response.data.createdOrder.id;
            saveFiles(submittedform, createdOrderID)
        })
        .catch((err) => {
            console.log(err)
            form.value.processing = false;
            uploadProgress.value = {};
        });
}

const handleSubmit = () => {
    if (form.value.name.trim() === '') {
        triedToSubmit = true;
        formNameError.value = true;
        return;
    }

    if (form.value.description.trim() === '') {
        formDescriptionError.value = true;
        return;
    }

    if (form.value.files.length == 0) {
        formFilesError.value = true;
        return;
    }

    form.value.processing = true;
    $('.hideOnProcessing').slideUp();
    createNewOrder(form.value);
};

const validateFieldName = () => {
    if (triedToSubmit && form.value.name.trim() === '') {
        formNameError.value = true;
    } else {
        formNameError.value = false;
    }
}
const validateFieldDescription = () => {
    if (triedToSubmit && form.value.description.trim() === '') {
        formDescriptionError.value = true;
    } else {
        formDescriptionError.value = false;
    }
}

const onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('acceptedFiles= ', acceptedFiles);
    console.log('rejectedFiles= ', rejectedFiles);

    for (let i = 0; i < rejectedFiles.length; i++) {
        const file = rejectedFiles[i];
        file.id = uuidv4();
    }

    for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i];
        file.id = uuidv4();
    }

    if (formRejectedFiles.value.length > 0) {
        formRejectedFiles.value = [...formRejectedFiles.value, ...rejectedFiles];
    } else {
        formRejectedFiles.value = rejectedFiles;
    }

    if (formAcceptedFiles.value.length > 0) {
        formAcceptedFiles.value = [...formAcceptedFiles.value, ...acceptedFiles];
    } else {
        formAcceptedFiles.value = acceptedFiles;
    }

    form.value.files.push(...acceptedFiles);

    console.log(form.value.files)
};

const { getRootProps, getInputProps, open, isDragActive: dragActive } = useDropzone({
    onDrop,
    accept: ['.stl', '.ply']
});

const removeFile = (file) => {
    const rejectedIndex = formRejectedFiles.value.findIndex((f) => f.id === file.id);
    const acceptedIndex = formAcceptedFiles.value.findIndex((f) => f.id === file.id);

    if (rejectedIndex !== -1) {
        formRejectedFiles.value.splice(rejectedIndex, 1);
    } else if (acceptedIndex !== -1) {
        formAcceptedFiles.value.splice(acceptedIndex, 1);
        form.value.files = formAcceptedFiles.value;
    } else {
        console.warn('File not found:', file.id);
    }
};

watch(dragActive, (newValue) => {
    isDragActive.value = newValue;
});

const getFileIcon = (fileType) => {
    switch (fileType) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
        case 'image/gif':
        case 'image/bmp':
        case 'image/webp':
        case 'image/tiff':
        case 'image/svg+xml':
            return 'fa-file-image';

        case 'application/pdf':
            return 'fa-file-pdf';

        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'fa-file-excel';

        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'fa-file-word';

        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return 'fa-file-powerpoint';

        case 'text/html':
        case 'application/xml':
        case 'text/xml':
            return 'fa-file-code';

        case 'application/x-rar-compressed':
        case 'application/x-zip-compressed':
        case 'application/zip':
            return 'fa-file-zipper';

        case 'video/mp4':
        case 'video/x-msvideo':
        case 'video/quicktime':
        case 'video/x-matroska':
        case 'video/x-flv':
        case 'video/x-ms-wmv':
        case 'video/webm':
        case 'video/3gpp':
        case 'video/mpeg':
        case 'video/hevc':
            return 'fa-file-video';

        default:
            return 'fa-file';
    }
};

const noFileType = (file) => {
    const fileNameLength = file.name.split(".").length;

    if (file.name.split(".")[fileNameLength - 1] == "ply") {
        return "<img class='w-[30px] ' src='../../../images/plyfile.svg' />"
    } else if (file.name.split(".")[fileNameLength - 1] == "stl") {
        return "<img class='w-[30px] ' src='../../../images/stlfile.svg' />"
    } else {
        return "<i class='fa-solid fa-file'></i>"
    }
}

const formatDate = (datetime) => {
    if (typeof datetime !== 'string') {
        datetime = String(datetime); // Convert to string
    }

    // If datetime is in ISO format, convert it to expected format
    if (datetime.includes('T')) {
        const dateObj = new Date(datetime);

        const day = String(dateObj.getUTCDate()).padStart(2, '0');
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // JS months are 0-based
        const year = dateObj.getUTCFullYear();
        const hours = String(dateObj.getUTCHours()).padStart(2, '0');
        const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');

        datetime = `${day}${month}${year}${hours}${minutes}${seconds}`;
    }

    // Extract parts from 'ddMMyyyyHHmmss'
    const day = datetime.substring(0, 2);
    const month = datetime.substring(2, 4) - 1; // JS months are 0-based
    const year = datetime.substring(4, 8);
    const hours = datetime.substring(8, 10);
    const minutes = datetime.substring(10, 12);
    const seconds = datetime.substring(12, 14);

    // Create a UTC Date object
    const date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));

    // Get the user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Format date
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: userTimezone
    });

    // Format time
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: userTimezone
    });

    return `<div class="date mr-[5px]">${formattedDate}</div> <div class="time">${formattedTime}</div>`;
};

const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
};


</script>

<template>

    <Head title="Dashboard" />

    <AuthenticatedLayout class="authLayout">
        <template #header>
            <div class="flex flex-col justify-between">
                <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 mb-5 flex items-center">
                    Hi, 
                    <span
                        v-if="$page.props.auth.user.type == 'normal'">
                        &nbsp;Dr.&nbsp;
                    </span>
                    {{ $page.props.auth.user.name }}!
                    <span
                        class="ml-[10px] bg-[#c6c656] text-[#916106] p-[2px] px-[5px] rounded-[5px] font-bold text-[12px] leading-[12px]"
                        v-if="$page.props.auth.user.type == 'admin'">
                        admin
                    </span>
                    <span
                        class="ml-[10px] bg-[#c65656] text-[#910606] p-[2px] px-[5px] rounded-[5px] font-bold text-[12px] leading-[12px]"
                        v-if="$page.props.auth.user.type == 'superadmin'">
                        SUDO
                    </span>
                </h2>
                <!-- <nav class="text-sm text-gray-800 dark:text-gray-200" aria-label="Breadcrumb">
                    <ol class="list-none p-0 inline-flex">
                        <li class="flex items-center">
                            <Link href="/" class="text-gray-800 dark:text-gray-200">Home</Link>
                            <svg class="w-3 h-3 mx-3" fill="currentColor" viewBox="0 0 320 512">
                                <path d="M285.476 272.971L91.314 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.627-22.627c-9.373-9.373-9.373-24.569 0-33.941L196.686 256 34.746 94.255c-9.373-9.373-9.373-24.569 0-33.941l22.627-22.627c9.373-9.373 24.569-9.373 33.941 0L285.476 239.03c9.373 9.373 9.373 24.569 0 33.941z" />
                            </svg>
                        </li>
                        <li class="flex items-center">
                            <span>Dashboard</span>
                        </li>
                    </ol>
                </nav> -->
            </div>
        </template>

        <div class="py-12">
            <div class="errorDIV mx-auto max-w-7xl sm:px-6 lg:px-8 flex-col flex md:flex-row gap-4 md:gap-4">
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-[20px] w-full"
                    v-if="$page.props.flash.message" role="alert">
                    {{ $page.props.flash.message }}
                </div>
            </div>

            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 flex-col flex md:flex-row gap-4 md:gap-4 onMobileColumnFlip">

                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full">
                    <div class="p-6 text-gray-900 dark:text-gray-100 smallerPaddings">
                        <h3 class="mb-[20px] font-semibold text-[20px] border-b border-gray-100 dark:border-gray-700"
                            v-if="$page.props.auth.user.type != 'superadmin'">
                            Previous Orders
                        </h3>
                        <div v-if="orders.length == 0" class="text-white italic text-[14px]">No orders</div>
                        <ul v-if="orders.length>0">
                            <li v-for="order in orders" :key="order.id" :class="{
                                'border-gray-300 dark:border-gray-600 ': order.status === 'new',
                                'border-yellow-500 border-opacity-50': order.status === 'processing',
                                'border-blue-400 border-opacity-50': order.status === 'shipped',
                                'border-green-500 border-opacity-50': order.status === 'done',
                                'border-red-500 border-opacity-50': order.status === 'canceled'
                            }"
                                class="p-2 relative mb-[20px] last:mb-0 block w-full rounded-[10px]  border-2 shadow-sm dark:bg-gray-700 dark:text-white">
                                <div :class="{
                                    'bg-white text-gray-700': order.status === 'new',
                                    'bg-yellow-500 text-yellow-800': order.status === 'processing',
                                    'bg-blue-400 text-blue-900': order.status === 'shipped',
                                    'bg-green-500 text-green-900': order.status === 'done',
                                    'bg-red-500  text-red-900': order.status === 'canceled'
                                }"
                                    class="absolute top-2 right-[8px] p-[2px] px-[5px] rounded-[5px] font-bold text-[12px] leading-[12px]">
                                    {{ order.status }}
                                </div>

                                <div class="flex flex-col mb-0">
                                    <div class="text-[18px] mb-[5px] font-bold leading-[20px]">
                                        {{ order.name }}
                                    </div>
                                    <div class="flex items-center mb-[15px] dark:text-gray-400 text-[12px] leading-[12px]"
                                        v-html="formatDate(order.created_at)">
                                    </div>
                                    <div class="text-[14px] mb-[10px] leading-[16px]" v-if="order.description!=null">
                                        {{ order.description }}
                                    </div>
                                    
                                </div>

                                <div class="uploadedFilesDiv">
                                    <div class="text-[14px] leading-[16px] flex items-center">
                                        <span class="mr-[10px]">Attached files ({{ order.attachments?.length }})</span>
                                        <a href="javascript:;"
                                            class="uploadedFileToggle hover:text-gray-900 transition text-[12px] leading-[16px]">
                                            Show files <i></i>
                                        </a>
                                    </div>
                                    <ul class="uploadedFilesUl pt-2 hide transition">
                                        <li v-for="file in order.attachments" :key="file.id"
                                            class="p-[5px] block w-full rounded-[5px] dark:text-white transition hover:bg-gray-900">
                                            <a :href="file.file_path">
                                                <div class="flex justify-between items-center">
                                                    <div class="mr-[10px] w-[15px]">
                                                        <img class="w-[15px]" src="../../../public/images/stlfile.svg"
                                                            alt="">
                                                    </div>
                                                    <div class="w-[calc(100%-30px)]">
                                                        <div class="flex items-center w-full">
                                                            <div
                                                                class="fileOriginalName mr-[10px] w-full whitespace-nowrap overflow-hidden text-ellipsis text-[14px] leading-[16px]">
                                                                {{ file.originalName }}
                                                            </div>
                                                            <div
                                                                class="fileSize text-right w-[100px] dark:text-white-700 text-[12px] leading-[12px]">
                                                                {{ formatFileSize(file.size) }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </li>
                        </ul>
                    </div>

                    <div class="hidden p-6 text-gray-900 dark:text-gray-100 ">
                        <h3 class="mb-[20px] font-semibold text-[20px] border-b border-gray-100 dark:border-gray-700">
                            Files</h3>
                        <ul>
                            <li v-for="file in files" :key="file.id"
                                class="p-2 mb-[20px] last:mb-0 block w-full rounded-[10px] border-gray-300 border-2 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-gray-400 focus:border-gray-400">
                                <!-- <div class="fileName">{{ file.name }}</div> -->
                                <div class="flex items-center">
                                    <div class="mr-[10px] w-[30px]">
                                        <img class="w-[30px]" src="../../../public/images/stlfile.svg" alt="">
                                    </div>
                                    <div class="w-[calc(100%-40px)]">
                                        <div class="flex items-center mb-[5px] w-full">
                                            <div
                                                class="fileOriginalName mr-[10px] w-full whitespace-nowrap overflow-hidden text-ellipsis font-bold text-[16px] leading-[16px]">
                                                {{ file.originalName.split(".")[0] }}
                                            </div>
                                            <!-- <div
                                                class="fileExtension p-[4px] rounded-[5px] dark:bg-white dark:text-gray-700 font-bold text-[12px] leading-[12px]">
                                                .{{ file.extension }}
                                            </div> -->
                                        </div>

                                        <div class="flex items-center justify-between">
                                            <div class="fileSize dark:text-white-700 text-[12px] leading-[12px]">{{
                                                formatFileSize(file.size) }}</div>
                                            <!-- <div class="fileUploadedBy">{{ file.uploadedBy }}</div> -->
                                            <div class="fileUploadedOn flex items-center dark:text-white-700 text-[12px] leading-[12px]"
                                                v-html="formatDate(file.dateOfUpload)"></div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full"
                    v-if="$page.props.auth.user.type == 'normal'">
                    <div class="p-6 text-gray-900 dark:text-gray-100">

                        <h3
                            class="flex align-center mb-[20px] pb-[10px] font-semibold text-[20px] leading-[20px] border-b border-gray-100 dark:border-gray-700">

                            <div class="flex align-center justify-between mr-[5px] text-[20px] leading-[20px]"
                                v-if="form.processing && form.status != 'done'">
                                <span class="w-[20px] loader"></span>
                                <span class="w-[calc(100%-30px)]">Creating Order '{{ form.name }}'</span>
                            </div>
                            <div class="flex align-center justify-between mr-[5px] text-[20px] leading-[20px]"
                                v-if="form.status == 'done'">
                                <span class="w-[30px]">
                                    <i class="fa-solid fa-check text-[20px] leading-[20px] text-[#1cdb5c]"></i>
                                </span>
                                <span class="">Files uploaded!</span>
                            </div>
                            <div v-if="!form.processing && form.status != 'done'">New Order</div>
                        </h3>

                        {{ responseMessage }}

                        <form @submit.prevent="handleSubmit">
                            <div class="mb-4 hideOnProcessing">
                                <label for="name"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Patient's name</label>
                                <input type="text" id="name" :disabled="form.processing" v-model="form.name"
                                    @input="validateFieldName" :class="{ '!border-red-500': formNameError }"
                                    class="mt-1 block w-full rounded-[10px] border-gray-300 transition border-2 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-gray-400 focus:border-gray-400 focus:ring-0 focus:outline-none">
                            </div>

                            <div class="mb-4 hideOnProcessing">
                                <label for="description"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea type="text" id="name" :disabled="form.processing" v-model="form.description"
                                @input="validateFieldDescription" :class="{ '!border-red-500': formDescriptionError }"
                                    class="mt-1 block w-full rounded-[10px] border-gray-300 transition border-2 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white hover:border-gray-400 focus:border-gray-400 focus:ring-0 focus:outline-none h-[150px] resize-none"></textarea>
                            </div>

                            <div class="hideOnProcessing mb-4">
                                <span class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Document
                                    (STL
                                    file)</span>

                                <div v-bind="getRootProps()" :class="{ '!border-red-500': formFilesError }"
                                    class="dropzone flex justify-center w-full h-32 px-4 transition border-2 shadow-sm dark:bg-gray-700 border-gray-600 border-dashed rounded-[10px] appearance-none cursor-pointer hover:border-gray-400  focus:ring-0 outline-none">
                                    <input v-bind="getInputProps()" />
                                    <span class="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="w-6 h-6 text-gray-600 dark:text-white" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p v-if="isDragActive">Drop the files here ...</p>

                                        <span v-else class="font-medium text-gray-600 dark:text-white">
                                            Drop files to Attach, or
                                            <span
                                                class="text-blue-600 dark:text-white underline transition hover:text-blue-600">browse</span>
                                        </span>

                                    </span>

                                </div>
                            </div>

                            <div class="hideOnDone p-1 shadow-sm rounded-[10px] mb-[20px] mt-[0px] " role="alert"
                                v-if="formAcceptedFiles.length > 0">
                                <!-- <p class="flex justify-between mb-[20px]"><span class="font-bold">Files
                                        uploaded</span>
                                </p> -->

                                <ul>
                                    <li v-for="file in formAcceptedFiles" :key="file.name"
                                        class="flex items-center mb-[20px] last:mb-0 justify-between">
                                        <div class="flex items-center w-[85%]">
                                            <div class="fileicon mr-[10px]">
                                                <i v-if="file.type != ''"
                                                    :class="['fa-solid text-[20px]', getFileIcon(file.type)]"></i>
                                                <span v-if="file.type == ''" v-html="noFileType(file)">
                                                </span>
                                            </div>

                                            <div class="fileInfo w-[calc(100%-35px)] inline-flex flex-col">
                                                <div
                                                    class="filename w-full max-w-[100%] leading-[16px] mb-[5px] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                    <b>{{ file.name }}</b>
                                                </div>

                                                <div class="filesize text-[12px] leading-[12px]"
                                                    v-if="!form.processing && uploadProgress != 0 && file.status != 'uploaded'">
                                                    {{ formatFileSize(file.size) }}
                                                </div>

                                                <div v-if="form.processing && uploadProgress[file.id] > 0 && file.status != 'uploaded'"
                                                    class="progress-bar">
                                                    <div class="progress-bar-fill"
                                                        :style="{ width: uploadProgress[file.id] + '%' }"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="fileRemove w-[50px] text-right">
                                            <a @click="removeFile(file)" class="text-white-500 cursor-pointer"
                                                v-if="!form.processing && file.status != 'uploaded'">
                                                <i class="fa-regular fa-trash-can text-[16px]"></i>
                                            </a>
                                            <div
                                                v-if="form.processing && uploadProgress[file.id] > 0 && file.status == 'uploaded'">
                                                <i
                                                    class="fa-solid fa-check text-[16px] leading-[16px] text-[#1cdb5c]"></i>
                                            </div>
                                            <div
                                                v-if="form.processing && uploadProgress[file.id] && file.status != 'uploaded'">
                                                {{ uploadProgress[file.id] }} %
                                            </div>
                                            <div
                                                v-if="form.processing && uploadProgress[file.id] == 0 && file.status != 'uploaded'">
                                                <span class="border-1 border-white border-solid"></span>
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </div>

                            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-[20px]"
                                v-if="formRejectedFiles.length > 0" role="alert">
                                <p class="flex mb-[20px]"><span class="font-bold mr-[5px]">Rejected Files</span>
                                    Invalid file type</p>

                                <ul>
                                    <li v-for="file in formRejectedFiles"
                                        class="flex items-center mb-[20px] justify-between">
                                        <div class="flex items-center w-[90%]">
                                            <div class="fileicon mr-[10px]">
                                                <i :class="['fa-solid text-[30px]', getFileIcon(file.file.type)]"></i>
                                            </div>

                                            <div class="fileInfo w-[calc(100%-35px)] inline-flex flex-col">
                                                <div
                                                    class="filename w-full max-w-[100%] leading-[16px] mb-[5px] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                    <b>{{ file.file.name }}</b>
                                                </div>
                                                <div class="filesize text-[12px] leading-[12px]">
                                                    {{ formatFileSize(file.file.size) }}</div>

                                            </div>
                                        </div>

                                        <div class="fileRemove w-[15px]">
                                            <a @click="removeFile(file)" class="text-red-500 cursor-pointer">
                                                <i class="fa-regular fa-trash-can text-[16px]"></i>
                                            </a>
                                        </div>

                                    </li>
                                </ul>
                            </div>

                            <div class="hideOnProcessing actions flex justify-end">
                                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                    Upload
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>
.progress-bar {
    width: 100%;
    background-color: #111827;
    border-radius: 5px;
    overflow: hidden;
    height: 3px;
}

.progress-bar-fill {
    height: 100%;
    background-color: #1cdb5c;
    transition: width 0.2s ease-in-out;
}
</style>
