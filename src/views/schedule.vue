<template>
  <div id="schedules">
    <h2>{{description}}</h2>
    <div class="schedules" v-for="(schedule, key) in schedulesDates" :key="key">
      <div class="date">
        <p>{{schedule.date}}</p>
      </div>
      <div class="descs">
        <div v-for="descs in shedulesDescriptions" :key="descs.serviceTime">
          <div class="desc" v-if="schedule.id == descs.pId">
            <span class="material-icons" @click="findLesson(descs.id)">
              create
            </span>
            {{ descs.time }} <a href="#"> {{ descs.lesson + ' ' + descs.auditor }} </a>
          </div>
        </div>
      </div>
    </div>
    <button class="v_catalog-item__show-info" @click="showPopupInfo">
      Добавить занятие
    </button>
    <add_Lesson :edit="pEdit" v-if="isInfoPopupVisible" @closePopup="closeInfoPopup" @AddLesson="addRow" @SaveLesson="changelesson" class="popup">
      <div class="form">
        <p>Lesson</p>
        <input type="text" v-model="lesson">
      </div>
      <div class="form">
        <p>Auditor</p>
        <input type="text" v-model="auditor">
      </div>
      <div class="form">
        <p>Date</p>
        <input type="date" v-model="date">
      </div>
      <div class="form">
        <p>Time</p>
        <input type="text" v-model="time">
      </div>
      <div class="form">
        <p>Group</p>
        <input type="text" v-model="group">
      </div>
      <div class="form">
        <p>Description</p>
        <input type="text" v-model="shedulesDescription">
      </div>
      <div class="form">
        <p>Repeat</p>
        <div class="popup__radio-group">
          <div class="radio">
            <input type="radio" id="age1" name="age" value="every day" v-model="repeat">
            <label for="age1">каждый день</label>
          </div>
          <div class="radio">
            <input type="radio" id="age2" name="age" value="every week" v-model="repeat">
            <label for="age2">еженедельно</label>
          </div>
          <div class="radio">
            <input type="radio" id="age3" name="age" value="Two times per week" v-model="repeat">
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
                date: '',
                time: '',
                lesson: '',
                auditor: '',
                shedulesDescription: '',
                repeat: '',
                group: '',
                pEdit: 0,
                editId: -1,
                schedulesDates: [
                    {
                        id: 1,
                        date: "2020-07-01"
                    },
                    {
                        id: 2,
                        date: "2020-07-02"
                    }
                ],
                shedulesDescriptions: [
                    {
                        id: 1,
                        pId: 1,
                        time: "11:10",
                        shedulesDescription: "",
                        lesson: "Лин. Анализ",
                        auditor: "ауд.215",
                        repeat: 0,
                        group: "3360"
                    },
                    {
                        id: 2,
                        pId: 1,
                        time: '13:30',
                        shedulesDescription: 'Теор вер 3 курс',
                        lesson: "Лин. Анализ",
                        auditor: "ауд.215",
                        repeat: 0,
                        group: "3360"
                    },
                    {
                        id: 3,
                        pId: 2,
                        time: '13:30',
                        shedulesDescription: 'Теор вер 3 курс',
                        lesson: "Лин. Анализ",
                        auditor: "ауд.215",
                        repeat: 0,
                        group: "3360"
                    }
                ],
                description: 'расписание'
            }
        },
        methods: {
            showPopupInfo() {
                this.isInfoPopupVisible = true;
                this.date = '';
                this.time = '';
                this.lesson = '';
                this.auditor = '';
                this.shedulesDescription = '';
                this.pEdit = 0;
            },
            closeInfoPopup() {
                this.isInfoPopupVisible = false;
            },
            addRow() {
                var maxPId = this.schedulesDates.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
                let findDate = this.schedulesDates.find(e => e.date === this.date);

                if (findDate) {
                    maxPId = findDate.id
                }

                const maxId = this.shedulesDescriptions.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;

                if (this.date) {
                    if (!findDate) {
                        this.schedulesDates.push({
                            date: this.date,
                            id: maxPId
                        });

                    }
                    this.shedulesDescriptions.push({

                        time: this.time,
                        id: maxId,
                        pId: maxPId,
                        shedulesDescription: this.shedulesDescription,
                        lesson: this.lesson,
                        auditor: this.auditor,
                        repeat: 0,
                        group: "3360"

                    });
                    this.isInfoPopupVisible = false;
                } else {
                    alert("Необходимо ввести дату!")
                }
            },
            findLesson(id) {
                let findLes = this.shedulesDescriptions.find(e => e.id === id);
                let findDate = this.schedulesDates.find(e => e.id === findLes.pId);

                this.isInfoPopupVisible = true;

                this.date= findDate.date;
                this.time= findLes.time;
                this.lesson= findLes.lesson;
                this.auditor= findLes.auditor;
                this.shedulesDescription= findLes.shedulesDescription;
                this.repeat= findLes.repeat;
                this.group= findLes.group;
                this.pEdit = 1;

                this.editId = id;


            },
            changelesson() {
                const index = this.shedulesDescriptions.findIndex(n => n.id === this.editId);

                let findLes = this.shedulesDescriptions.find(e => e.id === this.editId);

                if (index !== -1) {
                    this.shedulesDescriptions.splice(index, 1);
                }

                this.shedulesDescriptions.push({

                    time: this.time,
                    id: findLes.id,
                    pId: findLes.pId,
                    shedulesDescription: this.shedulesDescription,
                    lesson: this.lesson,
                    auditor: this.auditor,
                    repeat: 0,
                    group: "3360"

                });

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

  .material-icons {
    cursor: pointer;
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