<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, watch, defineProps, onMounted, computed } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import $ from 'jquery';
import Modal from '@/Components/Modal.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
    orders: {
        type: Array,
        required: true
    }
});

const groupedOrders = props.orders.reduce((acc, order) => {
    const createdBy = order.created_by;
    if (!acc[createdBy]) {
        acc[createdBy] = [];
    }
    acc[createdBy].push(order);
    return acc;
}, {});

const groupedOrdersArray = Object.entries(groupedOrders).map(([createdBy, orders]) => ({
    createdBy,
    orders
}));

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

const searchQuery = ref('');
const selectedStatus = ref('');
const sortByDate = ref('desc');

const filteredOrders = computed(() => {
    return groupedOrdersArray
        .filter(order =>
            (!searchQuery.value || order.createdBy.toLowerCase().includes(searchQuery.value.toLowerCase()))
        );
});

const clearFilters = () => {
    selectedStatus.value = "";
    searchQuery.value = "";
    sortByDate.value = "desc";
}

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
    
    $('.userOrderToggle').click(function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).parent().parent().find('.ordersList').slideUp();
            $(this).text("Show orders")
        } else {
            $(this).addClass('open');
            $(this).parent().parent().find('.ordersList').slideDown();
            $(this).text("Hide orders")
        }
    });
});

const processing = ref(false);

</script>

<template>

    <Head title="Orders" />

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
            <div class="errorDIV mx-auto max-w-7xl sm:px-6 lg:px-8 flex-col flex md:flex-row gap-4 md:gap-4">
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-[20px] w-full"
                    v-if="$page.props.flash.message" role="alert">
                    {{ $page.props.flash.message }}
                </div>
            </div>
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 flex-col flex md:flex-row gap-4 md:gap-4">

                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full"
                    v-if="$page.props.auth.user.type == 'admin' || $page.props.auth.user.type == 'superadmin'">

                    <div
                        class="filtersDiv p-2 border-b border-gray-100 dark:border-gray-700  flex flex-col md:flex-row gap-4">
                        <input v-model="searchQuery" type="text" placeholder="Search by name..."
                            class="mt-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 block w-full md:w-full" />

                        <!-- <select v-model="selectedStatus"
                            class="mt-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 block w-full md:w-1/4">
                            <option value="">All</option>
                            <option value="new">New</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="done">Done</option>
                            <option value="canceled">Canceled</option>
                        </select>

                        <select v-model="sortByDate"
                            class="mt-0 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 block w-full md:w-1/4">
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select> -->
                        <button @click="clearFilters()"
                            class="clearButton inline-flex justify-center items-center rounded-md border border-transparent bg-gray-800 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300">
                            Clear
                        </button>
                    </div>

                    <div class="px-[10px] py-6 text-gray-900 dark:text-gray-100 ">
                        <!-- <h3 class="mb-[20px] font-semibold text-[20px] border-b border-gray-100 dark:border-gray-700"
                            v-if="$page.props.auth.user.type != 'superadmin'">
                            Previous Orders
                        </h3> -->

                        <ul>
                            <li v-for="user in filteredOrders" :key="user.createdBy"
                                class="p-2 relative mb-[20px] last:mb-0 block w-full rounded-[10px] border-2 border-gray-300 dark:border-gray-600 shadow-sm dark:bg-gray-700 dark:text-white">
                                <h3 class="flex align-center justify-between text-[18px] leading-[20px]">
                                    {{ user.createdBy }}
                                    <a href="javascript:;"
                                        class="userOrderToggle hover:text-gray-900 transition text-[12px] leading-[20px]">
                                        Show Orders <i></i>
                                    </a>
                                </h3>

                                <ul class="ordersList mt-[20px]">
                                    <li v-for="order in user.orders" :key="order.id" :class="{
                                        ' dark:border-gray-600 ': order.status === 'new',
                                        'border-yellow-500 border-opacity-50': order.status === 'processing',
                                        'border-blue-400 border-opacity-50': order.status === 'shipped',
                                        'border-green-500 border-opacity-50': order.status === 'done',
                                        'border-red-500 border-opacity-50': order.status === 'canceled'
                                    }"
                                        class="p-2 relative mb-[20px] last:mb-0 block w-full rounded-[10px] border-2 shadow-sm dark:bg-gray-700 dark:text-white">
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

                                        <Link :href="route('orders.details', { id: order.id })"
                                            class="absolute top-[50%] translate-y-[-50%] right-[8px] p-[2px] px-[5px] rounded-[5px] font-bold text-[12px] leading-[12px]">
                                        View details <i class="text-white ml-[5px] fa-solid fa-arrow-right"></i>
                                        </Link>

                                        <div class="flex flex-col mb-[10px]">
                                            <div class="text-[18px] mb-[10px] leading-[20px]">
                                                <span class="block font-bold mb-[5px]">{{ order.name }}</span>
                                                {{ order.created_by == null ? 'unknown' : order.created_by }}
                                            </div>
                                            <div class="flex items-center dark:text-white-700 text-[12px] leading-[12px]"
                                                v-html="formatDate(order.created_at)">
                                            </div>
                                        </div>

                                        <div class="uploadedFilesDiv">
                                            <div class="text-[14px] leading-[16px] flex items-center">
                                                <span class="mr-[10px]">Attached files ({{ order.attachments?.length
                                                    }})</span>
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
                                                                <img class="w-[15px]"
                                                                    src="../../../public/images/stlfile.svg" alt="">
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
                                    <li v-if="filteredOrders.length == 0" class="text-center italic text-[14px]">
                                        No orders
                                    </li>
                                </ul>
                            </li>
                        </ul>


                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
