<template>
    <div class="kalendar-korisnik-container">
        <el-calendar v-model="value" class="kalendar">
            <template slot="dateCell" slot-scope="{asdsa, data}" @click="radi">
                <p :class="data.isSelected ? 'is-active' : ''"></p>
                <el-badge v-for="item in this.listaZahteva" :value="item.value" :key="item.value" class="item" type="warning">
                    <p :class="data.isSelected ? 'is-active' : ''">{{data.day.slice(2).join('-')}}</p>
                </el-badge>
            </template>
        </el-calendar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: new Date(),
            listaZahteva: ['2020-05-24','2020-05-25','2020-05-26','2020-05-27']
        }
    }
}
</script>

<style scoped>
    .kalendar-korisnik-container{
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        overflow: auto;
        background-color: rgba(224, 224, 235, 0.445);
    }
    .item{
        height: 30px;
        width: 30px;
        font: 20px;
    }
    el-badge{
        font: 20px;
    }
</style>