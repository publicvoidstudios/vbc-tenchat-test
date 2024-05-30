<template>
  <div class="container grid grid-cols-2 mx-auto h-[100dvh]">
    <div class="bg-secondary flex flex-col items-center justify-center rounded-s-[50px]">
      <div class="w-[453px] text-start mb-[30px] ms-[-22px]">
        <h2 class="text-[40px] font-bold text-fontSecondary mb-[20px]">Hi,
          <span>{{ username }}!</span>
        </h2>
        <button class="btn-primary" @click="logout">LOG OUT</button>
      </div>
    </div>
    <RightSide
        image-src="/assets/index-image.png"
        header="Welcome!"
        text="This page is only to give feedback that login was successful!"
        :additional-image-src="image"
    />
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store/authStore";

const authStore = useAuthStore();

const { firstName, username, image } = authStore;

onMounted(() => {
  if(!firstName) {
    redirectLogin();
  }
})

const redirectLogin: (() => void) = () => {
  const router = useRouter();
  router.push('/login');
}

const logout: (() => void) = () => {
  authStore.logout();
  redirectLogin();
}
</script>