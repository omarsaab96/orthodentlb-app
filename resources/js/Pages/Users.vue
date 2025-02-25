<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, nextTick, defineProps, } from 'vue';
import Modal from '@/Components/Modal.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import axios from "axios";
import { useForm } from '@inertiajs/vue3';


const props = defineProps({
    users: {
        type: Array,
        required: true
    }
});

const editform = useForm({
    id: '',
    name: '',
    email: '',
    phone: '',
    type: '',
    linked: ''
});

const confirmingUserDeletion = ref(false);
const userToBeDeleted = ref(null);
const processing = ref(false);

const confirmingUserEdit = ref(false);
const userToBeEdited = ref(null);

const editNameInput = ref(null);

const editUser = (user) => {
    confirmingUserEdit.value = true;
    userToBeEdited.value = user;

    editform.id = userToBeEdited.value.id;
    editform.name = userToBeEdited.value.name;
    editform.email = userToBeEdited.value.email;
    editform.phone = userToBeEdited.value.phone == null ? null : userToBeEdited.value.phone;
    editform.type = userToBeEdited.value.type;
    editform.linked = userToBeEdited.value.linked;

    nextTick(() => editNameInput.value.focus());
}

const confirmEditUser = () => {
    processing.value = true

    editform.put(route('editUser'), {
        preserveScroll: true,
        onSuccess: () => closeEditModal(),
        onError: (err) => console.log(err),
        onFinish: () => editform.reset(),
    });
};

const deleteUser = (user) => {
    confirmingUserDeletion.value = true;
    userToBeDeleted.value = user;
};

const confirmDeleteUser = () => {
    processing.value = true
    axios.delete('/api/deleteUser/' + userToBeDeleted.value.id, {
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
            closeModal();
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
    processing.value = false;
    userToBeDeleted.value = null;
};

const closeEditModal = () => {
    confirmingUserEdit.value = false;
    processing.value = false;
    userToBeEdited.value = null;
    editform.value = {
        id: '',
        name: '',
        email: '',
        phone: '',
        type: '',
        linked: ''
    }
};


</script>

<template>

    <Head title="Users" />

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
                                <td style="border:1px solid white">{{ user.phone == null ? 'null' : user.phone }}</td>
                                <!-- <td style="border:1px solid white">{{ user.email_verified_at }}</td> -->
                                <td style="border:1px solid white">{{ user.type }}</td>
                                <!-- <td style="border:1px solid white">{{ user.updated_at }}</td> -->
                                <td style="border:1px solid white">{{ user.linked }}</td>
                                <td style="border:1px solid white">
                                    <a href="javascript:;" @click="editUser(user)"
                                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
                                        edit
                                    </a>
                                    <a href="javascript:;" @click="deleteUser(user)"
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

    <Modal :show="confirmingUserDeletion" @close="closeModal">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Are you sure you want to delete user ?
                <br><br>
                <span class="font-bold">ID: {{ userToBeDeleted?.id }}</span>
            </h2>


            <table class="mt-1 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <tr class="border-b border-t border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Name</td>
                    <td class="pr-[10px]">{{ userToBeDeleted?.name }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Email</td>
                    <td class="pr-[10px]">{{ userToBeDeleted?.email }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Phone</td>
                    <td class="pr-[10px]">{{ userToBeDeleted?.phone }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Role</td>
                    <td class="pr-[10px]">{{ userToBeDeleted?.type }}<br></td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">isLinked</td>
                    <td class="pr-[10px]">{{ userToBeDeleted?.linked == 0 ? 'false' : 'true' }}<br></td>
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
                    @click="confirmDeleteUser">
                    Delete Account
                </DangerButton>
            </div>
        </div>
    </Modal>

    <Modal :show="confirmingUserEdit" @close="closeEditModal">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                <span class="font-bold">ID: {{ userToBeEdited?.id }}</span>
            </h2>


            <table class="mt-1 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <tr class="border-b border-t border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Name</td>
                    <td class="pr-[10px]">
                        <input id="name" ref="editNameInput" v-model="editform.name" type="text"
                            class="block w-full p-0 text-[14px] bg-transparent border-none" />

                        <p v-if="editform.errors.name" :message="editform.errors.name" class="mt-2"></p>
                    </td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Email</td>
                    <td class="pr-[10px]">
                        <input id="email" v-model="editform.email" type="email"
                            class="block w-full p-0 text-[14px] bg-transparent border-none" />

                        <p v-if="editform.errors.email" :message="editform.errors.email" class="mt-2"></p>
                    </td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Phone</td>
                    <td class="pr-[10px]">
                        <input id="phone" v-model="editform.phone" type="text"
                            class="block w-full p-0 text-[14px] bg-transparent border-none" />

                        <p v-if="editform.errors.phone" :message="editform.errors.phone" class="mt-2"></p>
                    </td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">Role</td>
                    <td class="pr-[10px]">
                        <input id="type" v-model="editform.type" type="text"
                            class="block w-full p-0 text-[14px] bg-transparent border-none" />

                        <p v-if="editform.errors.type" :message="editform.errors.type" class="mt-2"></p>
                    </td>
                </tr>
                <tr class="border-b border-1 border-solid border-gray-600">
                    <td class="w-[100px] font-semibold">isLinked</td>
                    <td class="pr-[10px]">
                        <input id="linked" v-model="editform.linked" type="checkbox" :true-value="'1'"
                            :false-value="'0'" class="form-checkbox" />

                        <p v-if="editform.errors.linked" :message="editform.errors.linked" class="mt-2"></p>
                    </td>
                </tr>
            </table>

            <p class="mt-1 text-sm text-blue-400">
                <i class="fa-solid fa-circle-info mr-[5px]"></i>
                Once this account is edited, all of its info will be permanently changed.
            </p>

            <div class="mt-6 flex justify-end">
                <SecondaryButton @click="closeEditModal">
                    Cancel
                </SecondaryButton>

                <PrimaryButton class="ms-3" :class="{ 'opacity-25': processing }" :disabled="processing"
                    @click="confirmEditUser">
                    Save changes
                </PrimaryButton>
            </div>
        </div>
    </Modal>
</template>
