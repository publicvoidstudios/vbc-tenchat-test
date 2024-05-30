<template>
  <MainContainer>
    <LeftSide>
      <div class="w-[453px] text-start mb-[30px] ms-[-22px]">
        <h2 class="header mb-[-8px]">Create your account</h2>
        <span class="text-[20px] text-fontSecondarySubtle w-[213px] ">Unlock all Features!</span>
      </div>
      <form class="form">
        <div class="mb-[10px]">
          <input
              class="form-input form-input--start-image form-input--wide bg-person"
              type="text"
              name="user"
              id="user"
              placeholder="Username"
              v-model="username"
          >
          <label for="user" class="hidden">Username</label>
        </div>
        <div class="mb-[10px]">
          <input
              class="form-input form-input--start-image form-input--wide bg-envelope"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              v-model="email"
          >
          <label for="email" class="hidden">Email</label>
        </div>
        <div class="relative mb-[10px]">
          <input
              class="form-input form-input--start-image form-input--wide bg-shield-slash"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              v-model="password"
              ref="passwordInput"
          >
          <label for="password" class="hidden">Password</label>
          <span
              class="eye-slash"
              @click="toggleVisibility(passwordInput as HTMLInputElement)"
          >
            <img src="/assets/eye-slash.svg" alt="Slashed eye">
          </span>
        </div>
        <div class="relative mb-[10px]">
          <input
              class="form-input form-input--start-image form-input--wide bg-shield-slash"
              type="password"
              name="passwordRepeat"
              id="passwordRepeat"
              placeholder="Confirm Password"
              v-model="passwordRepeat"
              ref="passwordCheckInput"
          >
          <label for="passwordRepeat" class="hidden">Confirm Password</label>
          <span
              class="eye-slash"
              @click="toggleVisibility(passwordCheckInput as HTMLInputElement)"
          >
            <img src="/assets/eye-slash.svg" alt="Slashed eye">
          </span>
        </div>
        <div class="flex items-center gap-1 self-start mb-[25px]">
          <input
              class="checkbox my-1 me-2"
              type="checkbox"
              name="terms"
              id="terms"
              v-model="terms"
          >
          <label class="cursor-pointer text-[16px]" for="terms">Accept <nuxt-link class="text-primaryLight" to="#">terms and conditions</nuxt-link></label>
        </div>

        <button type="submit" class="btn-primary mb-[20px]" ref="signupBtn" @click.prevent="handleSignup">SIGN UP</button>
        <p class="text-[16px] text-fontSecondarySubtle mb-[20px]">You have account? <nuxt-link class="font-bold text-primaryLight cursor-pointer" @click.prevent="handleRouteLeave">Login now</nuxt-link></p>
      </form>
    </LeftSide>
    <RightSide
        image-src="/assets/signup-image.png"
        header="Join us!"
        text="Just go through the boring process of creating an account."
    />
  </MainContainer>
</template>

<script setup lang="ts">
import {type Ref, ref} from 'vue'
import { useAuthStore } from "~/store/authStore";
import MainContainer from "~/components/MainContainer.vue";

const authStore = useAuthStore();


const signupBtn: any = ref(null);

onMounted(() => {
  (signupBtn.value as HTMLButtonElement).disabled = true;
  username.value = authStore.username;
  email.value = authStore.email;
})

const username: Ref<string> = ref('');
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const passwordRepeat: Ref<string> = ref('');
const terms: Ref<boolean> = ref(false);

watch([username, email, password, passwordRepeat, terms], ([newUsername, newEmail, newPassword, newPasswordRepeat, newTerms]) => {
  const btn = signupBtn.value as HTMLButtonElement;
  btn.disabled = !(newUsername.trim() !== '' && newEmail.trim() !== '' && newPassword.trim() !== '' && newPasswordRepeat.trim() !== '' && newTerms && newPasswordRepeat === newPassword);
})

const passwordInput: Ref<HTMLInputElement|null> = ref(null);
const passwordCheckInput: Ref<HTMLInputElement|null> = ref(null);


const toggleVisibility = (input: HTMLInputElement) => {
  input.type = input.type === 'password' ? 'text' : 'password';
}

const handleRouteLeave = () => {
  const router = useRouter()
  if(username.value || email.value) {
    const userResponse = confirm('Are you sure want to leave this page? All input data will be lost');
    if (userResponse) {
      router.push('/login');
    }
  } else {
    router.push('/login');
  }
}

const handleSignup = () => {
  //Save data to state manager
  authStore.storeUsername(username.value);
  authStore.storeEmail(email.value);
  authStore.storePassword(password.value);
  //Change route
  const router = useRouter();
  router.push('/otp');
}
</script>