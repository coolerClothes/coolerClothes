<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useCartStore } from "../store";
import CartCards from "../components/CartCards.vue";

/* Disable/enable fieldsets logic */

const deliveryInfo = ref();

onMounted(() => {
    const inputs = Array.from(deliveryInfo.value.getElementsByTagName('input'))
    console.log(inputs)
    const areInputsValid = computed(() => {
        return inputs.every(input => input.checkValidity());
    });

    if (areInputsValid.value) {
        console.log('All inputs are valid.');
    } else {
        console.log('No inputs are invalid.');
    }

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
    <div class="xl:px-[10%] px-4 my-4 overflow-x-hidden">
        <p class="text-2xl font-antonio pt-4 pl-4">Checkout</p>
        <form class="font-inter font-light text-[#F5F5F5]">
            <!-- checkout page grid -->
            <div class="grid p-4 grid-cols-2 grid-rows-3 gap-4 2xl:gap-[1.7vw] font-inter ">
                <!-- delivery information div -->
                <div class="bg-[#1c1c1c]">
                    <fieldset id="deliveryInfo" ref="deliveryInfo" class="text-[#0c0c0c]">
                        <!-- regex:
                            "[\p{L}a-z]" = letters including swedish/international letters
                            "\s?-?" = optional whitespace or hyphen
                         -->
                        <legend>Delivery Information</legend>
                        <input id="email" aria-label="Email" type="email" placeholder="Email" class="w-full" required
                            maxlength="40">
                        <input id="phoneNumber" aria-label="Phone number" type="text" placeholder="Phone number"
                            pattern="(\+?(\d\s?-?){11}|(\d\s?-?){10})" required>
                        <input id="firstName" aria-label="First name" type="text" placeholder="First name"
                            pattern="[\p{L}a-z]{1,30}" required>
                        <input id="lastName" aria-label="Last name" type="text" placeholder="Last name"
                            pattern="[\p{L}a-z]{1,30}" required>
                        <input id="adress" aria-label="Delivery adress" type="text" placeholder="Delivery adress"
                            pattern="[\p{L}a-z]{0,30}\s?\d{1,3}" required>
                        <input id="postCode" aria-label="Post code" type="text" placeholder="Post code" required
                            pattern="\d{3}\s?\d{2}">
                        <input id="postTown" aria-label="Post town" type="text" placeholder="Post town" required
                            pattern="[\p{L}a-z]{1,15}">
                    </fieldset>
                </div>
                <!-- checkout cart div -->
                <div id="cart" class="bg-[#1c1c1c] row-span-3">
                    <h2 class="text-[#F5F5F5]">Cart</h2>
                    <div class="mt-[2cqh]">
                        <CartCards :editAllowed="false" />
                        <div class="flex flex-col">
                            <div class="flex justify-between mt-6 font-inter">
                                <h3>Delivery Cost</h3>
                                <h3>0:-</h3>
                            </div>
                            <div class="flex justify-between mt-8 font-inter">
                                <h3>Total Cost:</h3>
                                <h3>{{ totalAmount }}:-</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Shipment method div -->
                <div class="bg-[#1c1c1c]">
                    <fieldset id="shippingMethod">
                        <legend>Shipping method</legend>
                        <div class="ring-white ring-2 mt-[2cqh]">
                            <div class=" ring-white ring-1 flex flex-row items-center">
                                <input id="postnord" type="radio" value="postnord" name="shippingMethod">
                                <label for="postnord">Postnord</label>
                                <img src="/src/assets/shipping/postnord-logo.png" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto">
                            </div>
                            <div class="flex flex-row items-center">
                                <input id="instabox" type="radio" value="instabox" name="shippingMethod">
                                <label for="instabox">Instabox</label>
                                <img src="/src/assets/shipping/Instabox-logo.jpg" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto">
                            </div>
                            <div class="ring-white ring-1 flex flex-row items-center">
                                <input id="dhl" type="radio" value="dhl" name="shippingMethod">
                                <label for="dhl">DHL </label>
                                <img src="/src/assets/shipping/dhl-logo.png" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto">
                            </div>
                        </div>
                    </fieldset>
                </div>
                <!-- payment method div -->
                <div class="bg-[#1c1c1c]">
                    <fieldset id="paymentMethod">
                        <legend>Payment method</legend>
                        <div class="ring-white ring-2 mt-[2cqh]">
                            <div class="flex flex-row items-center">
                                <input id="swish" type="radio" value="swish" name="paymentMethod">
                                <label for="swish">Swish</label>
                                <img src="/src/assets/payment/swish-logo.jpg" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto">
                            </div>
                            <div class="ring-white ring-1 flex flex-row items-center">
                                <input id="klarna" type="radio" value="klarna" name="paymentMethod">
                                <label for="klarna">Klarna</label>
                                <img src="/src/assets/payment/klarna-logo.jpg" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto">
                            </div>
                            <div class="flex flex-row items-center">
                                <input id="masterCard" type="radio" value="masterCard" name="paymentMethod">
                                <label for="masterCard">Mastercard </label>
                                <img src="/src/assets/payment/mastercard-logo.png" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto">
                            </div>
                            <div class="ring-white ring-1 flex flex-row items-center">
                                <input id="visa" type="radio" value="visa" name="paymentMethod">
                                <label for="visa">VISA</label>
                                <img src="/src/assets/payment/visa-logo.jpg" alt=""
                                    class="h-16 w-28 object-cover inline ml-auto">
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </form>
    </div>
</template>


<style scoped>
/* Custom css made to avoid repeat tailwind class declarations on elements */

/* General styling */
fieldset,
#cart {
    padding: 0 2rem 2rem 2rem;
}

legend,
h2 {
    color: #F5F5F5;
    padding-top: 2rem;
    font-weight: bold;
    font-size: 1.25rem;
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
    padding: 0.5rem;
    margin-top: 2cqh;
    margin-bottom: 1cqh;
    margin-right: 1cqh;
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
