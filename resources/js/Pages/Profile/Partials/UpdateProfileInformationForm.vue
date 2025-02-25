<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import { ref } from "vue";


defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const user = usePage().props.auth.user;

const emailVerificationRequired = ref(false)
const phoneVerificationRequired = ref(false)

const form = useForm({
    name: user.name,
    email: user.email,
    phone: user.phone
});
const submitForm = () => {
    // console.log("Submitting form:", form); // Log form before sending
    form.patch(route('profile.update'));
};
</script>

<template>
    <section class="flex content-between items-center gap-4 w-full columnSmall">
        <header class="w-[40%]">
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Profile Information
            </h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Update your account's profile information and email address.
            </p>
        </header>

        <div class="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 w-full">
            <form @submit.prevent="submitForm()" class="mt-6 space-y-6">
                <div>
                    <InputLabel for="name" value="Name" />

                    <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.name" required autofocus
                        autocomplete="name" />

                    <InputError class="mt-2" :message="form.errors.name" />
                </div>

                <div>
                    <InputLabel for="email" value="Email" />

                    <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required
                        autocomplete="username"
                        v-if="user.email_verified_at === null" />

                    <InputError class="mt-2" :message="form.errors.email" />

                    <p class="text-white text-[16px] flex items-center justify-between"
                        v-if="user.email_verified_at !== null">
                        <span>{{ form.email }}</span>

                        <span class="text-[14px] leading-[14px] text-[#1cdb5c]"><i class="fa-solid fa-check"></i>
                            verified</span>
                    </p>
                </div>

                <!-- <div class="!mt-[10px]" v-if="user.email_verified_at === null">
                    <p class="text-sm text-red-400" v-if="status !== 'verification-link-sent'">
                        <i class="fa-solid fa-triangle-exclamation mr-[5px]"></i>Your email address is unverified.
                        <Link :href="route('verification.send')" method="post" as="button"
                            class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
                        Verify now
                        </Link>
                    </p>

                    <div v-show="status === 'verification-link-sent'"
                        class="mt-[10px] text-sm font-medium text-blue-600 dark:text-blue-400">
                        A new verification link has been sent to your email address.
                    </div>
                </div> -->

                <div>
                    <InputLabel for="phone" value="Phone" />

                    <TextInput id="phone" type="text" class="mt-1 block w-full" v-model="form.phone" required
                        autocomplete="phone"
                        v-if="user.phone_verified_at === null" />

                    <InputError class="mt-2" :message="form.errors.phone" />

                    <p class="text-white text-[16px] flex items-center justify-between"
                        v-if="user.phone_verified_at !== null">
                        <span>{{ form.phone }}</span>

                        <span class="text-[14px] leading-[14px] text-[#1cdb5c]"><i class="fa-solid fa-check"></i>
                            verified</span>
                    </p>
                </div>

                <div class="!mt-[10px]" v-if="user.phone_verified_at === null && phoneVerificationRequired">
                    <p class="text-sm text-red-400">
                        <i class="fa-solid fa-triangle-exclamation mr-[5px]"></i>Your phone number is unverified.
                        <Link :href="route('verification.send')" method="post" as="button"
                            class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
                        Verify now
                        </Link>
                    </p>

                    <div v-show="status === 'phone-verification-code-sent'"
                        class="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                        A new verification code has been sent to your phone.
                    </div>
                </div>

                <div class="flex items-center gap-4 justify-end">
                    <PrimaryButton :disabled="form.processing">Save</PrimaryButton>

                    <Transition enter-active-class="transition ease-in-out" enter-from-class="opacity-0"
                        leave-active-class="transition ease-in-out" leave-to-class="opacity-0">
                        <p v-if="form.recentlySuccessful" class="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </div>
    </section>
</template>
