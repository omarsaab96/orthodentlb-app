<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, watch, defineProps, onMounted } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';


const props = defineProps({
    files: {
        type: Array,
        required: true
    }
});

console.log(props.files)


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
                                <td style="border:1px solid white">{{ file.linked }}</td>
                                <td style="border:1px solid white"><a target="_blank" class="transition hover:text-gray-500" :href="file.file_path">download</a> delete</td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
