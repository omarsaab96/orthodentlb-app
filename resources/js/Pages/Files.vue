<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, watch, defineProps, onMounted } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import Modal from '@/Components/Modal.vue';


const props = defineProps({
    files: {
        type: Array,
        required: true
    }
});

const deleteForm = useForm({
    id: ''
});

const confirmingFileDeletion = ref(false);
const fileToBeDeleted = ref(null);
const processing = ref(false);
const editing_isLinked = ref('');


const editform = useForm({
    id: '',
    linked: ''
});

const editFile = (file) => {
    editform.id = file.id;
    editform.linked = file.linked

    editing_isLinked.value = file.id

    editform.put(route('editFile'), {
        preserveScroll: true,
        onSuccess: () => {
            editing_isLinked.value = '';
            editform.value = {
                id: '',
                linked: ''
            }
        },
        onError: (err) => console.log(err),
        onFinish: () => editform.reset(),
    });
};

const deleteFile = (file) => {
    confirmingFileDeletion.value = true;
    fileToBeDeleted.value = file;
    deleteForm.id = fileToBeDeleted.value;
};

const confirmDeleteFile = () => {
    processing.value = true

    deleteForm.delete(route('deletefile'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: (err) => console.log(err),
        onFinish: () => deleteForm.reset(),
    });
};

const closeModal = () => {
    confirmingFileDeletion.value = false;
    processing.value = false;
    fileToBeDeleted.value = null;
    deleteForm.value = {
        id: ''
    }
};

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

    return `<div class="flex"><div class="date mr-[5px]">${formattedDate}</div> <div class="time">${formattedTime}</div></div>`;
};

const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
};

</script>

<template>

    <Head title="Files" />

    <AuthenticatedLayout class="authLayout">
        <template #header>
            <div class="flex flex-col justify-between">
                <h2 class="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 mb-5 flex items-center">
                    Hi, {{ $page.props.auth.user.name }}!
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
            </div>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 flex-col flex md:flex-row gap-4 md:gap-4">

                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full">
                    <div class="p-6 text-gray-900 dark:text-gray-100 ">
                        <table class="w-full" style="border:1px solid white">
                            <tr style="border:1px solid white">
                                <th style="border:1px solid white" class="font-bold text-left">ID</th>
                                <th style="border:1px solid white" class="font-bold text-left">Name</th>
                                <th style="border:1px solid white" class="font-bold text-left">Create_by</th>
                                <th style="border:1px solid white" class="font-bold text-left">Ext</th>
                                <th style="border:1px solid white" class="font-bold text-left">Size</th>
                                <th style="border:1px solid white" class="font-bold text-left">Created_at</th>
                                <th style="border:1px solid white" class="font-bold text-left">isLinked</th>
                                <th style="border:1px solid white" class="font-bold text-left">Actions</th>
                            </tr>
                            <tr v-for="file in files" :key="file.id" style="border:1px solid white">
                                <td style="border:1px solid white">{{ file.id }}</td>
                                <td style="border:1px solid white">{{ file.originalName }}</td>
                                <td style="border:1px solid white">{{ file.uploadedBy }}</td>
                                <td style="border:1px solid white">{{ file.extension }}</td>
                                <td style="border:1px solid white">{{ formatFileSize(file.size) }}</td>
                                <td style="border:1px solid white" v-html="formatDate(file.dateOfUpload)"></td>
                                <td style="border:1px solid white">
                                    <div class="flex align-center">
                                        <span v-if="editing_isLinked==file.id" class="w-[10px] loader"></span>
                                        <input id="linked" v-model="file.linked" type="checkbox" :true-value="1"
                                            :false-value="0" class="form-checkbox" @change="editFile(file)" />
                                    </div>
                                </td>
                                <td style="border:1px solid white">
                                    <a target="_blank"
                                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                        :href="file.file_path">
                                        download
                                    </a>

                                    <a href="javascript:;" @click="deleteFile(file)"
                                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
                                        delete
                                    </a>
                                </td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>

    <Modal :show="confirmingFileDeletion" @close="closeModal">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Are you sure you want to delete file ?
                <br><br>
                <span class="font-bold">ID: {{ fileToBeDeleted?.id }}</span>
            </h2>


            <table class="mt-1 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <tr class="border-b border-t border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Name</td>
                    <td class="pr-[10px]">{{ fileToBeDeleted?.originalName }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Ext</td>
                    <td class="pr-[10px]">.{{ fileToBeDeleted?.extension }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Size</td>
                    <td class="pr-[10px]">{{ fileToBeDeleted?.size }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Uploaded by</td>
                    <td class="pr-[10px]">{{ fileToBeDeleted?.uploadedBy }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">isLinked</td>
                    <td class="pr-[10px]">{{ fileToBeDeleted?.linked == 0 ? 'false' : 'true' }}<br></td>
                </tr>
            </table>

            <p class="mt-1 text-sm text-red-400">
                <i class="fa-solid fa-triangle-exclamation mr-[5px]"></i> Once this account is deleted, all of its
                resources
                and data
                will be permanently deleted.
            </p>

            <div class="mt-6 flex justify-end">
                <SecondaryButton @click="closeModal">
                    Cancel
                </SecondaryButton>

                <DangerButton class="ms-3" :class="{ 'opacity-25': processing }" :disabled="processing"
                    @click="confirmDeleteFile">
                    Delete Account
                </DangerButton>
            </div>
        </div>
    </Modal>
</template>
