<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav class="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <!-- Primary Navigation Menu -->
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 justify-between">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="flex shrink-0 items-center">
                                <Link :href="route('home')" class="logo logo_white w-10 small">

                                </Link>
                            </div>


                        </div>

                        <div class="hidden sm:ms-6 sm:flex sm:items-center">
                            <!-- Settings Dropdown -->
                            <div class="relative ms-3">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button type="button"
                                                class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                                                {{ $page.props.auth.user.name }}

                                                <svg class="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <!-- <DropdownLink :href="route('profile.edit')">
                                            Profile
                                        </DropdownLink> -->
                                        <DropdownLink :href="route('logout')" method="post" as="button">
                                            Log Out
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-me-2 flex items-center sm:hidden">
                            <button @click="
                                showingNavigationDropdown =
                                !showingNavigationDropdown
                                "
                                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path :class="{
                                        hidden: showingNavigationDropdown,
                                        'inline-flex':
                                            !showingNavigationDropdown,
                                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path :class="{
                                        hidden: !showingNavigationDropdown,
                                        'inline-flex':
                                            showingNavigationDropdown,
                                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{
                    block: showingNavigationDropdown,
                    hidden: !showingNavigationDropdown,
                }" class="absolute w-[100%] sm:hidden bg-[#1f2937]">
                    <div class="space-y-1 pb-3 pt-2">
                        <!-- <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">
                            Dashboard
                        </ResponsiveNavLink> -->

                        <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')"
                            class="pb-3 pr-[10px]" v-if="$page.props.auth.user.type == 'normal'">
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink :href="route('orders')"
                            :active="route().current('orders') || route().current('orders.details')"
                            class="pb-3 pr-[10px]"
                            v-if="$page.props.auth.user.type == 'superadmin' || $page.props.auth.user.type == 'admin'">
                            Orders
                        </ResponsiveNavLink>

                        <ResponsiveNavLink :href="route('ordersByUser')"
                            :active="route().current('ordersByUser') || route().current('ordersByUser')"
                            class="pb-3 pr-[10px]"
                            v-if="$page.props.auth.user.type == 'superadmin' || $page.props.auth.user.type == 'admin'">
                            Dentists
                        </ResponsiveNavLink>

                        <ResponsiveNavLink :href="route('files')" :active="route().current('files')" class="pb-3 px-[10px]"
                            v-if="$page.props.auth.user.type == 'superadmin'">
                            Files
                        </ResponsiveNavLink>

                        <ResponsiveNavLink :href="route('users')" :active="route().current('users')" class="pb-3 px-[10px]"
                            v-if="$page.props.auth.user.type == 'superadmin'">
                            Users
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div class="px-4">
                            <div class="text-base font-medium text-gray-800 dark:text-gray-200">
                                {{ $page.props.auth.user.name }}
                            </div>
                            <div class="text-sm font-medium text-gray-500">
                                {{ $page.props.auth.user.email }}
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header class="bg-white shadow dark:bg-gray-800" v-if="$slots.header">
                <div class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                    <slot name="header" />

                    <!-- Navigation Links -->
                    <div class="hideOnMobile space-x-8 flex justify-between">
                        <div>
                            <NavLink :href="route('dashboard')" :active="route().current('dashboard')"
                                class="pb-3 pr-[10px]" v-if="$page.props.auth.user.type == 'normal'">
                                Dashboard
                            </NavLink>

                            <NavLink :href="route('orders')"
                                :active="route().current('orders') || route().current('orders.details')"
                                class="pb-3 pr-[10px]"
                                v-if="$page.props.auth.user.type == 'superadmin' || $page.props.auth.user.type == 'admin'">
                                Orders
                            </NavLink>

                            <NavLink :href="route('ordersByUser')"
                                :active="route().current('ordersByUser') || route().current('ordersByUser')"
                                class="pb-3 pr-[10px]"
                                v-if="$page.props.auth.user.type == 'superadmin' || $page.props.auth.user.type == 'admin'">
                                Dentists
                            </NavLink>

                            <NavLink :href="route('files')" :active="route().current('files')" class="pb-3 px-[10px]"
                                v-if="$page.props.auth.user.type == 'superadmin'">
                                Files
                            </NavLink>

                            <NavLink :href="route('users')" :active="route().current('users')" class="pb-3 px-[10px]"
                                v-if="$page.props.auth.user.type == 'superadmin'">
                                Users
                            </NavLink>
                        </div>

                        <div>
                            <!-- <NavLink :href="route('profile.edit')" :active="route().current('profile.edit')"
                                class="pb-3">
                                Go back to homepage
                            </NavLink> -->
                            <NavLink :href="route('profile.edit')" :active="route().current('profile.edit')"
                                class="pb-3">
                                Profile
                            </NavLink>
                        </div>

                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
