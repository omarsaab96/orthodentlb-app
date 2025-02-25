<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});
</script>

<template>

    <Head title="Profile" />

    <AuthenticatedLayout class="authLayout">
        <template #header>
            <h2 class="someSpace text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 mb-5 flex items-center">
                Hi,
                <span v-if="$page.props.auth.user.type == 'normal'">
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
        </template>



        <div class="py-12 ">
            <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" class="w-full" />

                <UpdatePasswordForm class="w-full" />

                <DeleteUserForm class="w-full" v-if="$page.props.auth.user.type == 'normal'" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
