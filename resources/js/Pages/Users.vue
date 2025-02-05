<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, watch, defineProps, onMounted } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useDropzone } from 'vue3-dropzone';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';

const props = defineProps({
    users: {
        type: Array,
        required: true
    }
});

// console.log(props.users)

</script>

<template>

    <Head title="Users" />

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
                                <!-- <th style="border:1px solid white" class="font-bold text-left">created_at</th> -->
                                <th style="border:1px solid white" class="font-bold text-left">Email</th>
                                <th style="border:1px solid white" class="font-bold text-left">Phone</th>
                                <!-- <th style="border:1px solid white" class="font-bold text-left">email_verified_at</th> -->
                                <th style="border:1px solid white" class="font-bold text-left">Role</th>
                                <!-- <th style="border:1px solid white" class="font-bold text-left">updated_at</th> -->
                                <th style="border:1px solid white" class="font-bold text-left">isLinked</th>
                                <th style="border:1px solid white" class="font-bold text-left">Action</th>
                            </tr>
                            <tr v-for="user in users" :key="user.id" style="border:1px solid white">
                                <td style="border:1px solid white">{{ user.id }}</td>
                                <td style="border:1px solid white">{{ user.name }}</td>
                                <!-- <td style="border:1px solid white">{{ user.created_at }}</td> -->
                                <td style="border:1px solid white">{{ user.email }}</td>
                                <td style="border:1px solid white">{{ user.phone }}</td>
                                <!-- <td style="border:1px solid white">{{ user.email_verified_at }}</td> -->
                                <td style="border:1px solid white">{{ user.type }}</td>
                                <!-- <td style="border:1px solid white">{{ user.updated_at }}</td> -->
                                <td style="border:1px solid white">{{ user.linked }}</td>
                                <td style="border:1px solid white">edit delete</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
