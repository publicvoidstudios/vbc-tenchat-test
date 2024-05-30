<template>
  <MainContainer>
    <LeftSide>
      <div class="w-[453px] text-start mb-[20px] ms-[-24px]">
        <h2 class="header">Enter OTP</h2>
        <span class="text-[20px] text-fontSecondarySubtle w-[213px] leading-none">Sent OTP on <span class="font-semibold text-primaryLight">{{ email }}</span></span>
        <br>
        <nuxt-link class="text-[16px] font-bold text-primaryLight leading-[30px]" to="/signup">Change email</nuxt-link>
      </div>
      <form class="form">
        <div class="flex gap-5 mb-[24px]">
          <input v-model="input1" type="text" maxlength="1" class="form-input form-input--narrow" placeholder="-" required>
          <input v-model="input2" type="text" maxlength="1" class="form-input form-input--narrow" placeholder="-" required>
          <input v-model="input3" type="text" maxlength="1" class="form-input form-input--narrow" placeholder="-" required>
          <input v-model="input4" type="text" maxlength="1" class="form-input form-input--narrow" placeholder="-" required>
          <input v-model="input5" type="text" maxlength="1" class="form-input form-input--narrow" placeholder="-" required>
          <input v-model="input6" type="text" maxlength="1" class="form-input form-input--narrow" placeholder="-" required>
        </div>
        <button type="submit" class="btn-primary mb-[20px]" ref="btnSubmit" @click.prevent="handleSubmit">SUBMIT</button>
        <div v-if="message">
          <p class="text-red-500 font-bold">{{ message }}</p>
        </div>
      </form>
    </LeftSide>
    <RightSide
        image-src="/assets/otp-image.png"
        header="It's just OTP verification"
        text="You are one step away from recovering your password."
    />
  </MainContainer>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store/authStore";

const authStore = useAuthStore();

const email = ref(authStore.email)

const input1 = ref('');
const input2 = ref('');
const input3 = ref('');
const input4 = ref('');
const input5 = ref('');
const input6 = ref('');

const btnSubmit: Ref<HTMLButtonElement|null> = ref(null);

//If all inputs are filled - enable submit button
watch([input1, input2, input3, input4, input5, input6], ([newInput1, newInput2, newInput3, newInput4, newInput5, newInput6]) => {
  const btn = btnSubmit.value as HTMLButtonElement;
  btn.disabled = !(newInput1.trim() !== '' && newInput2.trim() !== '' && newInput3.trim() !== '' && newInput4.trim() !== '' && newInput5.trim() !== '' && newInput6.trim() !== '');
})

let inputs: HTMLCollectionOf<Element>;

onMounted(() => {
  //Initially disable submit button
  (btnSubmit.value as HTMLButtonElement).disabled = true

  //Handling input behavior
  inputs = document.getElementsByClassName('form-input');
  //Focus first on start
  (inputs[0] as HTMLInputElement).focus();
  //On input
  for (let input of inputs) {
    input.addEventListener('input', (e) => {
      if((input as HTMLInputElement).value.trim() !== "") {
        (input.nextSibling as HTMLInputElement)?.focus();
      }
    });
  }
  //On delete
  for (let input of inputs) {
    input.addEventListener('input', (e) => {
      if (!(input as HTMLInputElement).value) {
        if((e as InputEvent).inputType === 'deleteContentBackward') {
          (input.previousSibling as HTMLInputElement)?.focus();
        }
      }
    });
  }
});

const message = ref('');

const handleSubmit = async() => {
  await $fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: authStore.username,
      password: authStore.password
    }),
    async onResponse({ response }) {
      if(response.ok) {
        const { _data:user } = response;

        authStore.storeFirstName(user?.firstName)
        authStore.storeLastName(user?.lastName)
        authStore.storeImage(user?.image)

        const router = useRouter();
        await router.push('/');
      }
      else {
        message.value = response._data.message;
      }
    }
  })
}
</script>