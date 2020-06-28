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
                        {{ descs.time }}  <a href="#"> {{ descs.desc }} </a>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style>
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

<script>
    export default {
        name: 'schedules',
        data: () => {
            return {
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
        computed: {
            filteredList: function (dt) {

                /*var date = dt;*/

                var date = {
                    toString: function () {
                        return dt;
                    }
                };

                alert(dt);

                return this.times.filter(function (elem) {

                    if (date === '') return true;
                    else return elem.date.indexOf(date) > -1;
                })
            }
        }
    }
</script>

