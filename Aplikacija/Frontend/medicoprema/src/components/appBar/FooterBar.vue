<template>
    <div class="footer-container">
        <div class="pad-group">
            <div class="grid-one-half" style="color:white;">
                <p>MEDICOprema © 2020. All Rights Reserverd</p>
                <p>Designed by Group-mRS Team</p>
                <p>Kontakt telefon: 018/548-156</p>
                <p>Rajićeva 36M, 18000 Niš Srbija</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .footer-container{
        display: flex;
        justify-content: end;
        width: 100%;
         background-color:  rgba(24, 102, 89, 0.925);
         
    }
    .pad-group{
        padding: 15px 30px 15px;
        width: 100%;
        flex-direction: row;
        display: flex;
    }
    .grid-one-half{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 50%;
        position: relative;
    }
    p{
        line-height: 1.5em;
        margin-bottom: 0em;
        font-size: 13px;
        color: white;
    }
    .grid-one-half-last{
        width: 50%;
    }
    #social-links{
        flex-direction: row;
        display: flex;
        justify-content: flex-end;
    }
    @media screen and (max-width: 750px){
        .pad-group{
            flex-direction: column;
        }
        .grid-one-half{
            width: 100%;
            justify-content: center;
            align-items: center;
        }
        .grid-one-half-last{
            width: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
        }
        
    }
</style>
