<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useCartStore } from "../store";
import CartCards from "../components/CartCards.vue";

/* Disable/enable fieldsets logic */


/* ref deliveryInfo corresponds to the fieldset deliveryInfo */
const deliveryInfo = ref();
let shipFieldsetDisabled = ref(true);
let payFieldsetDisabled = ref(true);
let confirmFieldsetDisabled = ref(true);
let addCoFields = ref(false);

onMounted(() => {

    const deliveryInfoInputs = Array.from(deliveryInfo.value.getElementsByTagName('input'));
    const shippingMethodFieldset = document.getElementById('shippingMethod');
    const paymentMethodFieldset = document.getElementById('paymentMethod');

    /* valid = elements in fieldset are checked or filled out according to constraints */

    /* Check if deliveryInfo fieldset is valid */
    deliveryInfoInputs.forEach(input => {
        input.addEventListener("keyup", () => {
            const isFieldsetComplete = computed(() => {
                return deliveryInfoInputs.every(input => input.checkValidity());
            });

            /* Enable next fieldset when all inputs in this one are validated */
            if (isFieldsetComplete.value === true) {
                /* Enable shipping method fieldset, if shipping methos fieldset is valid enable payment method fieldset too*/
                shipFieldsetDisabled.value = false;
                if (shippingMethodFieldset.querySelector('input[name="shippingMethod"]:checked') !== null) {
                    payFieldsetDisabled.value = false
                }
            }
            else {
                /* Disable both radio button fieldsets if delivery info fieldset is not valid */
                shipFieldsetDisabled.value = true;
                payFieldsetDisabled.value = true;
            }
        })
    })

    /* Check if shippingMethod fieldset is valid */
    shippingMethodFieldset.querySelectorAll('input[name="shippingMethod"]').forEach(radioButton => {
        radioButton.addEventListener('click', () => {
            if (shippingMethodFieldset.querySelector('input[name="shippingMethod"]:checked') !== null) {
                payFieldsetDisabled.value = false
                console.log(payFieldsetDisabled.value);
            }
        });
    });

    paymentMethodFieldset.querySelectorAll('input[name="paymentMethod"]').forEach(radioButton => {
        radioButton.addEventListener('click', () => {
            if (paymentMethodFieldset.querySelector('input[name="paymentMethod"]:checked') !== null) {
                confirmFieldsetDisabled.value = false
                console.log(confirmFieldsetDisabled.value);
            }
        });
    });

})


/* Imported cart functions */
const store = useCartStore();

const totalAmount = ref(0);

const getTotalAmount = () => {
    let newTotalAmount = 0;
    if (!store.cart) {
        return;
    }
    for (const product of store.cart) {
        newTotalAmount += product.price;
    }
    totalAmount.value = newTotalAmount;
};

watch(
    () => store.cart,
    () => {
        getTotalAmount();
    },
);

getTotalAmount();

</script>


<template>
    <div class="2xl:px-[20%] px-4 my-4 overflow-x-hidden">
        <p class="text-2xl font-antonio pt-4 pl-4">Checkout</p>
        <form class="font-inter font-light text-[#F5F5F5]">
            <!-- checkout page grid -->
            <div class="grid p-4 grid-cols-5 grid-rows-20 gap-4 2xl:gap-[1vw] font-inter ">
                <!-- delivery information div -->
                <div class="bg-[#1c1c1c] col-span-3 row-span-3 px-6 pt-8 pb-10 border-solid border-l-4 border-[#00e0ff]" :class="{ 'border-solid border-l-4 border-[#4dc94f]': !shipFieldsetDisabled }">
                    <fieldset id="deliveryInfo" ref="deliveryInfo" class="text-[#0c0c0c]">
                        <!-- regex:
                            "[\p{L}a-z]" = letters including swedish/international letters
                            "\s?-?" = optional whitespace or hyphen
                         -->
                        <legend class="text-[#868686]">Delivery Information</legend>
                        <input id="email" aria-label="Email" type="email" placeholder="Email" class="w-[48.5%]" required
                            maxlength="40">
                        <input id="phoneNumber" aria-label="Phone number" type="text" placeholder="Phone number"
                            class="w-[48.5%]" pattern="(\+?(\d\s?-?){11}|(\d\s?-?){10})" required>
                        <input id="firstName" aria-label="First name" type="text" placeholder="First name"
                            class="w-[48.5%]" pattern="[\p{L}a-z]{1,30}" required>
                        <input id="lastName" aria-label="Last name" type="text" placeholder="Last name"
                            class="w-[48.5%]" pattern="[\p{L}a-z]{1,30}" required>
                        <input id="adress" aria-label="Delivery adress" type="text" placeholder="Delivery adress"
                            class="w-[35.5%]" pattern="[\p{L}a-z]{0,30}\s?\d{1,3}" required>
                        <input id="postCode" aria-label="Post code" type="text" placeholder="ZIP code" required
                            class="w-[30%]" pattern="\d{3}\s?\d{2}">
                        <input id="postTown" aria-label="Post town" type="text" placeholder="City" required
                            class="w-[30%]" pattern="[\p{L}a-z]{1,15}">
                        <input v-if="addCoFields === true" id="coAdress" aria-label="c/o adress" type="text"
                            placeholder="c/o adress" class="w-[35.5%]" pattern="[\p{L}a-z]{0,30}\s?\d{1,3}" required>
                        <input v-if="addCoFields === true" id="coPostCode" aria-label="c/o post code" type="text"
                            placeholder="c/o ZIP code" required class="w-[30%]" pattern="\d{3}\s?\d{2}">
                        <input v-if="addCoFields === true" id="coPostTown" aria-label="c/o ost town" type="text"
                            placeholder="c/o City" required class="w-[30%]" pattern="[\p{L}a-z]{1,15}">

                        <!-- Check if c/o adress fields are present -->
                        <button v-if="!addCoFields" id="adressButton" label="Add c/o adress"
                            @click="addCoFields = !addCoFields"
                            class="px-5  mt-3 text-[#003238] bg-[#00e0ff] font-semibold rounded-md hover:opacity-90 font-inter border-y-4 border-[#00000000] disabled:opacity-20 disabled:hover:border-[#ff007a00] relative drop-shadow-[0_4.3px_1.4px_rgba(0,0,0,0.2)] block">
                            <div id="button-contents" class="relative p-1.5">
                                <p class="inline">Add c/o-adress <span class="text-xl font-bold">+</span></p>
                            </div>
                        </button>
                        <button v-else id="adressButton" label="Remove c/o adress" @click="addCoFields = !addCoFields"
                            class="px-5  mt-3 text-[#003238] bg-[#00e0ff] font-semibold rounded-md hover:opacity-90 font-inter border-y-4 border-[#00000000] disabled:opacity-20 disabled:hover:border-[#ff007a00] relative drop-shadow-[0_4.3px_1.4px_rgba(0,0,0,0.2)] block">
                            <div id="button-contents" class="relative p-1.5">
                                <p class="inline">Remove c/o-adress <span class="text-xl font-bold">-</span></p>
                            </div>
                        </button>
                    </fieldset>

                </div>
                <!-- checkout cart div -->
                <div id="cart" class="col-span-2 row-span-12 relative top-0 right-0 h-auto">
                    <div class="bg-[#1c1c1c] p-1">
                        <h2 class="text-[#F5F5F5] font-semibold px-6 pt-6 pb-10">Cart</h2>
                        <CartCards />
                        <div class="flex flex-col p-6">
                            <div class="flex justify-between mt-8 font-inter">
                                <h3>Delivery Cost</h3>
                                <h3>0:-</h3>
                            </div>
                            <div class="flex justify-between mt-4 font-inter font-bold">
                                <h3>Total Cost:</h3>
                                <h3>{{ totalAmount }}:-</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- shipment method div -->
                <div class="bg-[#1c1c1c] col-span-3 row-span-3 px-6 pt-8 pb-10 border-solid border-l-4 border-[#00e0ff]" :class="{ 'opacity-40 filter grayscale': shipFieldsetDisabled }, { 'border-solid border-l-4 border-[#4dc94f]': !payFieldsetDisabled }">
                    <fieldset id="shippingMethod" :disabled=shipFieldsetDisabled>
                        <legend class="text-[#868686]">Shipping method</legend>
                        <div>
                            <div class="flex flex-row items-center border-solid border-[#2a2a2a] border-2">
                                <input id="postnord" type="radio" value="postnord" name="shippingMethod"
                                    class="border-none size-5 ml-5 mr-3">
                                <label for="postnord">Postnord</label>
                                <img src="/src/assets/shipping/postnord-logo.png" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto"
                                    :class="{ 'filter grayscale': shipFieldsetDisabled }">
                            </div>
                            <div class="flex flex-row items-center border-solid border-[#2a2a2a] border-x-2">
                                <input id="instabox" type="radio" value="instabox" name="shippingMethod"
                                    class="border-none size-5 ml-5 mr-3">
                                <label for="instabox">Instabox</label>
                                <img src="/src/assets/shipping/Instabox-logo.jpg" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto"
                                    :class="{ 'filter grayscale': shipFieldsetDisabled }">
                            </div>
                            <div class="flex flex-row items-center border-solid border-[#2a2a2a] border-2">
                                <input id="dhl" type="radio" value="dhl" name="shippingMethod"
                                    class="border-none size-5 ml-5 mr-3">
                                <label for="dhl">DHL </label>
                                <img src="/src/assets/shipping/dhl-logo.png" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto"
                                    :class="{ 'filter grayscale': shipFieldsetDisabled }">
                            </div>
                        </div>
                    </fieldset>
                </div>
                <!-- payment method div -->
                <div class="bg-[#1c1c1c] col-span-3 row-span-4 px-6 pt-8 pb-10 border-solid border-l-4 border-[#00e0ff]" :class="{ 'opacity-40 filter grayscale': payFieldsetDisabled }, { 'border-solid border-l-4 border-[#4dc94f]': !confirmFieldsetDisabled }">
                    <fieldset id="paymentMethod" :disabled=payFieldsetDisabled>
                        <legend class="text-[#868686]">Payment method</legend>
                        <div>
                            <div class="flex flex-row items-center border-solid border-[#2a2a2a] border-2">
                                <input id="swish" type="radio" value="swish" name="paymentMethod"
                                    class="border-none size-5 ml-5 mr-3">
                                <label for="swish">Swish</label>
                                <img src="/src/assets/payment/swish-logo.jpg" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto"
                                    :class="{ 'filter grayscale': payFieldsetDisabled}" >
                            </div>
                            <div class="flex flex-row items-center border-solid border-[#2a2a2a] border-x-2">
                                <input id="klarna" type="radio" value="klarna" name="paymentMethod"
                                    class="border-none size-5 ml-5 mr-3">
                                <label for="klarna">Klarna</label>
                                <img src="/src/assets/payment/klarna-logo.jpg" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto"
                                    :class="{ 'filter grayscale': payFieldsetDisabled}" >
                            </div>
                            <div class="flex flex-row items-center border-solid border-[#2a2a2a] border-x-2 border-t-2">
                                <input id="masterCard" type="radio" value="masterCard" name="paymentMethod"
                                    class="border-none size-5 ml-5 mr-3">
                                <label for="masterCard">Mastercard </label>
                                <img src="/src/assets/payment/mastercard-logo.svg" alt=""
                                    class="h-16 w-28 inline ml-auto bg-[#16366F]"
                                    :class="{ 'filter grayscale': payFieldsetDisabled}" >
                            </div>
                            <div class=" flex flex-row items-center border-solid border-[#2a2a2a] border-2">
                                <input id="visa" type="radio" value="visa" name="paymentMethod"
                                    class="border-none size-5 ml-5 mr-3">
                                <label for="visa">VISA</label>
                                <img src="/src/assets/payment/visa-logo.jpg" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto"
                                    :class="{ 'filter grayscale': payFieldsetDisabled}" >
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div class="text-center pb-12" :class="{ 'opacity-40 filter grayscale': confirmFieldsetDisabled }">
                <fieldset id="confirmPayment" :disabled=confirmFieldsetDisabled>
                    <input type="checkbox" id="newsLetter" name="News Letter" class="mr-3 size-5 align-middle"/>
                    <label for="newsLetter" class="align-middle text-sm">Sign up to our news letter!</label>
                    <p class="pt-6 font-semibold text-lg">Att betala: {{ totalAmount }}:-</p>
                    <router-link to="/orderConfirmation">
                        <button id="confirmButton" label="Confirm payment"
                            class="px-5  mt-4 text-[#000000] bg-[#4dc94f] font-semibold rounded-md hover:opacity-90 font-inter border-y-4 border-[#00000000] disabled:opacity-20 disabled:hover:border-[#ff007a00] relative drop-shadow-[0_4.3px_1.4px_rgba(0,0,0,0.2)]">
                            <div id="button-contents" class="relative p-1.5">
                                <p class="inline align-middle">Confirm payment</p>
                                <svg
                                    id="added-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-8 h-8 p-1 rounded-full inline transform text-[#000000]"
                                    >
                                <!-- animate-bounce duration-1000 -->
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                                </svg>
                            </div>
                        </button>
                    </router-link>
                </fieldset>
            </div>
        </form>
    </div>
</template>


<style scoped>
/* Custom css made to avoid repeat tailwind class declarations on elements */

/* General styling */

legend,
h2 {
    padding-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.75rem;
}

/* input elements styling (for input that !== radio buttons) */
::placeholder {
    color: #858585;
}

#deliveryInfo>input {
    background: #f5f5f5;
    outline: 1px solid #858585;
    padding-left: 1cqw;
    padding: 0.4rem;
    margin-bottom: 2.5%;
    margin-right: 1.5%;
}

#deliveryInfo>input:focus:placeholder-shown {
    outline: 3px solid #00E0FF !important;
}

#deliveryInfo>input:focus:valid {
    outline: 3px solid #35ad6d;
}

#deliveryInfo>input:focus:invalid {
    outline: 3px solid #c92f53;
}
</style>
