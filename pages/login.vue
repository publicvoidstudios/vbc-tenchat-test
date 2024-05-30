<template>
  <MainContainer>
    <LeftSide>
      <h2 class="header ms-[-12px] mb-[25px]">Login to your Account</h2>
      <div class="flex items-center justify-center mt-[-3px] mb-[28px]">
        <hr class="w-[120px] border-s border-fontSecondarySubtle">
        <span class="text-[15px] text-fontSecondarySubtle w-[213px] text-center">with email</span>
        <hr class="w-[120px] border-s border-fontSecondarySubtle">
      </div>
      <form class="form" @submit.prevent>
        <div>
          <input
              class="form-input form-input--wide form-input--start-image bg-envelope mb-[10px]"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              v-model="email"
          >
          <label for="email" class="hidden">Email</label>
        </div>
        <div class="relative mb-[25px]">
          <input
              class="form-input form-input--wide form-input--start-image bg-shield-slash"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              ref="passwordInput"
              v-model="password"
          >
          <label for="password" class="hidden">Password</label>
          <span
              class="eye-slash"
              @click="togglePasswordVisibility"

          >
            <img src="/assets/eye-slash.svg" alt="Slashed eye">
          </span>
        </div>
        <button type="submit" class="btn-primary mb-[20px]" ref="loginBtn" @click.prevent="handleSubmit">LOG IN</button>
        <div v-if="message" class="mb-[15px]">
          <p class="text-red-500 font-bold">{{message}}</p>
        </div>
        <span class="text-[16px] text-fontSecondarySubtle mb-[20px]">Don’t have account? <nuxt-link class="font-bold text-primaryLight" to="/signup">Create an account</nuxt-link></span>
      </form>
    </LeftSide>
    <RightSide
        image-src="/assets/login-image.png"
        header="Connect with any device."
        text="Everything you need is an internet connection."
    />
  </MainContainer>
</template>

<script setup lang="ts">
import {type Ref, ref, watch } from 'vue';
import {useAuthStore} from "~/store/authStore";
import MainContainer from "~/components/MainContainer.vue";

const passwordInput: Ref<HTMLInputElement>|Ref<null>|Ref<unknown> = ref(null);

const loginBtn:any = ref(null);

const togglePasswordVisibility = () => {
  const inputElement = passwordInput.value as HTMLInputElement;
  inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
}

onMounted(() => {
  (loginBtn.value as HTMLButtonElement).disabled = true;
})

const email = ref('');
const password = ref('');

const message = ref('');

watch([email, password], ([newEmail, newPassword]) => {
  const btn = loginBtn.value as HTMLButtonElement;
  btn.disabled = !(newEmail.trim() !== '' && newPassword.trim() !== '');
});

const authStore = useAuthStore();

const handleSubmit = async() => {
 await $fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: email.value,
      password: password.value
    }),
   async onResponse({ response }) {
     if(response.ok) {
       const { _data:user } = response;
       authStore.storeUsername(user?.username);
       authStore.storeEmail(user?.email);
       authStore.storeFirstName(user?.firstName);
       authStore.storeLastName(user?.lastName);
       authStore.storeImage(user?.image);
       const router = useRouter();
       await router.push('/');
     }
   },
   async onResponseError ({response}) {
      message.value = response._data.message;
   }
  })
}
</script>