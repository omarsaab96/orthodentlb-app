<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch, defineProps, onMounted, inject } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import $ from 'jquery';
const swal = inject("$swal");
import { useForm } from '@inertiajs/vue3';
import Modal from '@/Components/Modal.vue';


const props = defineProps({
    order: {
        type: Object,
        required: true
    },
    relatedOrders: {
        type: Array,
        required: true
    }
});

const changeStatusLoader = ref(false)

const confirmingOrderDeletion = ref(false);

const editform = useForm({
    id: props.order.id,
    linked: props.order.linked
});

const editOrder = () => {
    changeStatusLoader.value = true

    editform.put(route('editOrder'), {
        preserveScroll: true,
        onSuccess: () => {
            changeStatusLoader.value = false;
            editform.value = {
                id: props.order.id,
                linked: props.order.linked
            }
        },
        onError: (err) => console.log(err),
        onFinish: () => editform.reset(),
    });
};

const deleteOrder = () => {
    confirmingOrderDeletion.value = true;
};

const confirmDeleteOrder = () => {
    changeStatusLoader.value = true
    axios.delete('/api/deleteOrder/' + props.order.id, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
            closeModal();
            router.get('/orders');
        })
        .catch((err) => {
            console.log(err);
        });
};

const closeModal = () => {
    confirmingOrderDeletion.value = false;
    changeStatusLoader.value = false;
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

const updateOrderStatus = (status) => {
    axios.post('/api/updateOrderStatus', {
        id: props.order.id,
        status: status
    })
        .then((response) => {
            changeStatusLoader.value = false;
        })
        .catch((err) => {
            console.log(err);
            swal.fire({
                icon: "error",
                text: "Failed to change order status!",
                // timer: 1500,
                showConfirmButton: false,
            }).then((result) => {
                window.location.reload();
            });
        });
}

onMounted(() => {
    $('.orderDetailsStatus').each(function () {
        $(this).css('width', $(this).outerWidth() + "px");

        if (!$(this).hasClass('active')) {
            $(this).addClass('shrink')
        }
        $('.orderStatusContainer').removeClass('open')


        $(this).click(function () {
            if ($(this).hasClass('active')) {
                if ($('.orderStatusContainer').hasClass('open')) {
                    $('.orderStatusContainer').removeClass('open')
                    $('.orderDetailsStatus:not(.active)').addClass('shrink')
                } else {
                    $('.orderStatusContainer').addClass('open')
                    $('.orderDetailsStatus').removeClass('shrink')
                }
            } else {
                $('.orderDetailsStatus').removeClass('active');
                $(this).addClass('active')
                $('.orderStatusContainer').removeClass('open')
                $('.orderDetailsStatus:not(.active)').addClass('shrink')

                let newSelectedStatus = $(this).text().trim();

                switch (newSelectedStatus) {
                    case 'new':
                        $('.containerBorder').css('border-color', '#4b5563');
                        $('.orderHead').css('border-color', '#4b5563');
                        break;
                    case 'processing':
                        $('.containerBorder').css('border-color', '#eab308');
                        $('.orderHead').css('border-color', '#eab308');
                        break;
                    case 'shipped':
                        $('.containerBorder').css('border-color', '#60a5fa');
                        $('.orderHead').css('border-color', '#60a5fa');
                        break;
                    case 'done':
                        $('.containerBorder').css('border-color', '#22c55e');
                        $('.orderHead').css('border-color', '#22c55e');
                        break;
                    case 'canceled':
                        $('.containerBorder').css('border-color', '#ef4444');
                        $('.orderHead').css('border-color', '#ef4444');
                        break;
                    default:
                        break;
                }
                changeStatusLoader.value = true
                updateOrderStatus(newSelectedStatus);
            }
        })


    });

    setTimeout(function () {
        $('.orderDetailsStatus').css('opacity', '1');
    }, 500)


});

</script>

<template>

    <Head title="Order details" />

    <AuthenticatedLayout>
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

        <div class="py-12 orderDetailsDiv">

            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 flex-col flex md:flex-row gap-4 md:gap-4 mb-[50px]">
                <div class="containerBorder overflow-hidden border-solid border-2 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full"
                    :class="{
                        ' border-gray-300 dark:border-gray-600 ': order.status === 'new',
                        ' border-yellow-500': order.status === 'processing',
                        ' border-blue-400': order.status === 'shipped',
                        ' border-green-500': order.status === 'done',
                        ' border-red-500': order.status === 'canceled'
                    }">

                    <div class="p-6 text-gray-900 dark:text-gray-100 ">
                        <Link :href="route('orders')"
                            class="flex text-white items-center mb-[20px] rounded-[5px] text-[14px] leading-[14px] hover:text-gray-500 transition">
                        <i class="mt-[2px] mr-[5px] fa-solid fa-arrow-left"></i> Back to orders
                        </Link>
                        <div class="orderHead flex items-start justify-between pb-[10px] mb-[20px] border-b border-gray-100 dark:border-gray-600"
                            :class="{
                                ' border-gray-300 dark:border-gray-600 ': order.status === 'new',
                                ' border-yellow-500 dark:border-yellow-500': order.status === 'processing',
                                ' border-blue-400 dark:border-[#60a5fa]': order.status === 'shipped',
                                ' border-green-500 dark:border-green-500': order.status === 'done',
                                ' border-red-500 dark:border-red-500': order.status === 'canceled'
                            }">
                            <h3 class="orderdetailsname font-semibold text-[20px] max-w-[calc(100%-150px)]">
                                {{ props.order.name }}
                            </h3>
                            <div class="flex items-center statusbar">
                                <div class="flex items-center orderStatusContainer">
                                    <span v-if="changeStatusLoader" class="w-[20px] mr-[10px] loader"></span>

                                    <div :class="{ active: order.status == 'new' }"
                                        class="orderDetailsStatus bg-gray-300 text-gray-700">
                                        new
                                    </div>
                                    <div :class="{ active: order.status == 'processing' }"
                                        class="orderDetailsStatus bg-yellow-500 text-yellow-800">
                                        processing
                                    </div>
                                    <div :class="{ active: order.status == 'shipped' }"
                                        class="orderDetailsStatus bg-blue-400 text-blue-900">
                                        shipped
                                    </div>
                                    <div :class="{ active: order.status == 'done' }"
                                        class="orderDetailsStatus bg-green-500 text-green-900">
                                        done
                                    </div>
                                    <div :class="{ active: order.status == 'canceled' }"
                                        class="orderDetailsStatus bg-red-500  text-red-900">
                                        canceled
                                    </div>
                                </div>

                                <div v-if="$page.props.auth.user.type == 'superadmin'"
                                    class="flex items-center ml-[20px]">
                                    <div class="mr-[20px]">
                                        <label for="linked" class="cursor-pointer mr-[5px]">isLinked</label>
                                        <input id="linked" v-model="editform.linked" type="checkbox" :true-value="'1'"
                                            :false-value="'0'" class="form-checkbox" @change="editOrder()" />
                                    </div>
                                    <div>
                                        <a href="javascript:;" @click="deleteOrder()"
                                            class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
                                            delete
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>



                        <div class="flex flex-col mb-[50px]">
                            <table class="mt-1 mb-8 text-sm text-gray-600 dark:text-gray-400">
                                <tr class="border-b border-1 border-solid border-gray-600">
                                    <td class="align-top w-[150px] font-semibold">Description</td>
                                    <td class="align-top pr-[10px]"><span v-html="props.order.description ?? '<i>no description</i>'"></span></td>
                                </tr>
                                <tr class="border-b border-1 border-solid border-gray-600">
                                    <td class="w-[150px] font-semibold">Created by</td>
                                    <td class="pr-[10px]">Dr. {{ props.order.created_by }}<br></td>
                                </tr>
                                <tr class="border-b border-1 border-solid border-gray-600">
                                    <td class="w-[150px] font-semibold">Created on:</td>
                                    <td class="pr-[10px]" v-html="formatDate(order.created_at)"> </td>
                                </tr>
                                <tr class=" border-1 border-solid border-gray-600">
                                    <td class="w-[15    0px] font-semibold">Last updated on:</td>
                                    <td class="pr-[10px]" v-html="formatDate(order.updated_at)"> </td>
                                </tr>
                                <!-- <tr class="border-b border-1 border-solid border-gray-600">
                                    <td class="w-[100px] font-semibold">Attachments</td>
                                    <td class="pr-[10px]">{{ props.order.attachments.length }} {{
                                        props.order.attachments.length
                                        == 1 ?
                                        'file'
                                        : 'files' }}</td>
                                </tr>
                                <tr class="border-b border-1 border-solid border-gray-600">
                                    <td class="w-[100px] font-semibold">isLinked</td>
                                    <td class="pr-[10px]">{{ props.order.linked == 0 ? 'false' : 'true' }}<br></td>
                                </tr> -->
                            </table>
                        </div>

                        <div class="uploadedFilesDiv">
                            <div class="text-[18px] leading-[18px] flex items-center">
                                <span class="mr-[10px]">Attached files ({{ order.attachments?.length }})</span>
                            </div>
                            <ul class="pt-2">
                                <li v-for="file in order.attachments" :key="file.id"
                                    class="p-[5px] block w-full rounded-[5px] dark:text-white transition hover:bg-gray-900">
                                    <a :href="file.file_path">
                                        <div class="flex justify-between items-center">
                                            <div class="mr-[10px] w-[20px]">
                                                <img class="w-[20px]" src="../../../../public/images/stlfile.svg"
                                                    alt="">
                                            </div>
                                            <div class="w-[calc(100%-40px)]">
                                                <div class="flex items-center w-full">
                                                    <div
                                                        class="fileOriginalName mr-[10px] w-full whitespace-nowrap overflow-hidden text-ellipsis text-[18px] leading-[22px]">
                                                        {{ file.originalName }}
                                                    </div>
                                                    <div
                                                        class="fileSize text-right w-[100px] dark:text-white-700 text-[16px] leading-[16px]">
                                                        {{ formatFileSize(file.size) }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h4 class="text-white text-[20px] mb-[20px] flex items-center justify-between">
                    <div>More orders created by <span class="font-semibold">{{
                        order.created_by == null ? 'unknown' : order.created_by }}</span></div>
                    <div class="text-gray-500 text-[14px] leading-[14px]">
                        <span class="font-semibold">{{ props.relatedOrders.length }}</span> item{{
                            props.relatedOrders.length !=
                                1 ? 's' : '' }}
                    </div>
                </h4>

                <ul class="flex gap-[15px] flex-wrap relatedOrders">
                    <li v-for="order in props.relatedOrders" :key="order.id" :class="{
                        'border-gray-300 dark:border-gray-600 ': order.status === 'new',
                        'border-yellow-500 border-opacity-50': order.status === 'processing',
                        'border-blue-400 border-opacity-50': order.status === 'shipped',
                        'border-green-500 border-opacity-50': order.status === 'done',
                        'border-red-500 border-opacity-50': order.status === 'canceled'
                    }"
                        class="p-2 relative last:mb-0 block w-[calc(33.333333%-10px)] rounded-[10px]  border-2 shadow-sm dark:bg-gray-700 dark:text-white">
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

                        <div class="flex flex-col mb-[10px] ">
                            <div class="text-[18px] leading-[20px]">
                                <span class="block font-bold mb-[5px]">{{ order.name }}</span>
                                <!-- {{ order.created_by == null ? 'unknown' : order.created_by }} -->
                            </div>
                            <div class="flex datefield items-center dark:text-white-700 text-[14px] leading-[14px]"
                                v-html="formatDate(order.created_at)">
                            </div>
                        </div>

                        <div class="hidden uploadedFilesDiv">
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
                                                <img class="w-[15px]" src="/images/stlfile.svg" alt="">
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

                        <Link :href="route('orders.details', { id: order.id })"
                            class=" block text-right p-[2px] rounded-[5px] font-bold text-[14px] leading-[14px]">
                        View details <i class="text-white ml-[5px] fa-solid fa-arrow-right"></i>
                        </Link>

                    </li>
                    <li v-if="props.relatedOrders.length == 0" class="text-center text-white italic text-[14px]">
                        No orders
                    </li>
                </ul>
            </div>
        </div>
    </AuthenticatedLayout>

    <Modal :show="confirmingOrderDeletion" @close="closeModal">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Are you sure you want to delete order ?
                <br><br>
                <span class="font-bold">ID: {{ props.order.id }}</span>
            </h2>


            <table class="mt-1 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <tr class="border-b border-t border-1 border-solid border-gray-600">
                    <td class="w-[130px] font-semibold">Patient name</td>
                    <td class="pr-[10px]">{{ props.order.name }}<br></td>
                </tr>
                <tr class="border-b border-t border-1 border-solid border-gray-600">
                    <td class="align-top w-[130px] font-semibold">Description</td>
                    <td class="align-top pr-[10px]">{{ props.order.description }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[130px] font-semibold">Created by</td>
                    <td class="pr-[10px]">Dr. {{ props.order.created_by }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[130px] font-semibold">Status</td>
                    <td class="pr-[10px]">{{ props.order.status }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[130px] font-semibold">Attachments</td>
                    <td class="pr-[10px]">{{ props.order.attachments==null? '0' : props.order.attachments?.length }} {{ props.order.attachments?.length == 1 ?
                        'file'
                        : 'files' }}</td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[130px] font-semibold">isLinked</td>
                    <td class="pr-[10px]">{{ props.order.linked == 0 ? 'false' : 'true' }}<br></td>
                </tr>
            </table>

            <p class="mt-1 text-sm text-red-400">
                <i class="fa-solid fa-triangle-exclamation mr-[5px]"></i> Once this order is deleted, all of its
                resources
                and data
                will be permanently deleted.
            </p>

            <div class="mt-6 flex justify-end">
                <SecondaryButton @click="closeModal">
                    Cancel
                </SecondaryButton>

                <DangerButton class="ms-3" :class="{ 'opacity-25': changeStatusLoader }" :disabled="changeStatusLoader"
                    @click="confirmDeleteOrder">
                    Delete Account
                </DangerButton>
            </div>
        </div>
    </Modal>
</template>
