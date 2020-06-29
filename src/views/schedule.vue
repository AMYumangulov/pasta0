<template>
    <div id="schedules">
        <h2>{{description}}</h2>


        <div class="schedules" v-for="(schedule, key) in schedules" :key="key">
            <div class="date">
                <p>{{schedule.date}}</p>
            </div>
            <div class="descs">
                <div v-for="descs in schedule.descs" :key="descs.serviceTime">
                    <div class="desc">
                        {{ descs.time }} <a href="#"> {{ descs.desc }} </a>
                    </div>
                </div>
            </div>

        </div>
        <button class="v_catalog-item__show-info"
                @click="showPopupInfo"
        >Добавить занятие
        </button>
        <add_Lesson v-if="isInfoPopupVisible"
                    @closePopup="closeInfoPopup"
                    class="popup"
        >
            <div class="form">
                <p>Lesson</p>
                <input type="text">
            </div>
            <div class="form">
                <p>Auditor</p>
                <input type="text">
            </div>
            <div class="form">
                <p>Date</p>
                <input type="text">
            </div>
            <div class="form">
                <p>Description</p>
                <input type="text">
            </div>
            <div class="form">
                <p>Repeat</p>
                <div class="popup__radio-group">
                    <div class="radio">
                        <input type="radio" id="age1" name="age" value="30">
                        <label for="age1">каждый день</label>
                    </div>
                    <div class="radio">
                        <input type="radio" id="age2" name="age" value="60">
                        <label for="age2">еженедельно</label>
                    </div >
                    <div class="radio">
                        <input type="radio" id="age3" name="age" value="100">
                        <label for="age3">2 раза в неделю</label>
                    </div>
                </div>
            </div>
        </add_Lesson>

    </div>
</template>


<script>
    import add_Lesson from '../components/add_Lesson'

    export default {
        components: {add_Lesson},
        name: 'schedules',
        data: () => {
            return {
                isInfoPopupVisible: false,
                schedules: [
                    {
                        date: '12 марта',
                        descs: [
                            {
                                time: '11:10',
                                desc: 'Лин. Анализ, ауд.215, 3602'
                            },
                            {
                                time: '13:30',
                                desc: 'Теор вер 3 курс'
                            }
                        ]
                    },
                    {
                        date: '14 марта',
                        descs: [
                            {
                                time: '14:00',
                                desc: 'Лин. Анализ, ауд.215, 3602'
                            }
                        ]
                    },
                    {
                        date: '15 марта',
                        descs: [
                            {
                                time: '11:10',
                                desc: 'Мат стат'
                            }
                        ]
                    }
                ],
                description: 'расписание'
            }
        },
        methods: {
            showPopupInfo() {
                this.isInfoPopupVisible = true;
            },
            closeInfoPopup() {
                this.isInfoPopupVisible = false;
            }
        }
    }
</script>

<style>
    .popup {
        display: flex;
        flex-direction: column;

    }

    .form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;

    }

    .popup__radio-group {
        display: flex;
        flex-direction: column;
        width: 40%;
        margin-bottom: 10px;
    }

    .schedules {
        display: flex;
        flex-direction: row;
        /*border: aqua solid 1px;*/
    }

    .date {
        font-size: 30px;
        font-weight: 600;
        /*border: red solid 1px;*/
    }

    .descs {
        margin-left: 30px;
        /*border: green solid 1px;*/
    }

    .desc {
        margin-top: 10px
        /*border: blue solid 1px;*/
    }

    .date > p {
        margin-top: 0
    }


</style>