<template>
    <div class="pocetna">
        <div class="home"></div>
        <h1 style="color:white">Dobrodošli</h1>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .pocetna{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-size: cover;
        background-image: linear-gradient(
            rgba(26, 111, 168, 0.171),
            rgba(57, 63, 61, 0.205)
        ),url("../assets/home1.jpg");
    }
    .home{
        z-index: 1;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>