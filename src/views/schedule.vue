<template>
  <div id="schedules">
    <h2>{{description}}</h2>
    <div class="schedules" v-for="(schedule, key) in schedulesDates" :key="key">
      <div class="date">
        <p>{{schedule.date}}</p>
      </div>
      <div class="descs">
        <div v-for="descs in Descriptions" :key="descs.serviceTime">
          <div class="desc" v-if="schedule.id == descs.pId">
            <span class="material-icons" @click="findLesson(descs.id)">create</span>
            {{ descs.time }} <a href="#"> {{ descs.lesson + ' ' + descs.auditor }} </a>
            <span class="material-icons" @click="deleteLesson(descs.id)">delete_forever</span>
          </div>
        </div>
      </div>
    </div>
    <button class="v_catalog-item__show-info" @click="showPopupInfo">
      Добавить занятие
    </button>
    <add_Lesson :edit="pEdit" v-if="isInfoPopupVisible" @closePopup="closeInfoPopup" @AddLesson="addRow"
                @SaveLesson="changelesson" class="popup">
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
        <input type="text" v-model="Description">
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
  import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

  export default {
    components: {add_Lesson},
    name: 'schedules',
    computed: {
      ...mapState({
        schedulesDates: 'schedulesDates',
        Descriptions: 'Descriptions'
      }),
      ...mapGetters({
        getSchedulesDatesById: 'getSchedulesDatesById',
        getDescriptionsById: 'getDescriptionsById',
        getSchedulesDates: 'getSchedulesDates',
        getDescriptionIndexByID: 'getDescriptionIndexByID'
      })
    },

    data: () => {
      return {
        isInfoPopupVisible: false,
        date: '',
        time: '',
        lesson: '',
        auditor: '',
        Description: '',
        repeat: '',
        group: '',
        pEdit: 0,
        description: 'расписание'
      }
    },
    // watch: {
    //   date() {
    //     console.log(this.date);
    //   }
    // },
    methods: {
      ...mapActions({
        getDefaultCars: 'getDefaultCars'
      }),
      ...mapMutations({
        setSchedulesDates: 'setSchedulesDates',
        setDescriptions: 'setDescriptions'
      }),

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
        let schedulesDates = this.schedulesDates;

        // let maxPId = this.schedulesDates.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
        let maxPId = schedulesDates.length + 1

        let Descriptions = this.Descriptions;

        let maxId = Descriptions.length + 1;
        let findDate = this.schedulesDates.find(e => e.date === this.date);
        if (findDate) {
          maxPId = findDate.id

        }

        let schedulesDescription = {
          time: this.time,
          id: maxId,
          pId: maxPId,
          Description: this.Description,
          lesson: this.lesson,
          auditor: this.auditor,
          repeat: 0,
          group: "3360"
        };

        //

        if (this.date) {
          if (!findDate) {

            let schedulesDate = {
              id: schedulesDates.length + 1,
              date: this.date
            };
            this.setSchedulesDates([schedulesDate].concat(schedulesDates));
          }

          this.setDescriptions([schedulesDescription].concat(Descriptions));

          this.isInfoPopupVisible = false;
        } else {
          alert("Необходимо ввести дату!")
        }
      },
      findLesson(id) {
        // let findLes = this.Descriptions.find(e => e.id === id);
        // let findDate = this.schedulesDates.find(e => e.id === findLes.pId);

        let findLes = this.getDescriptionsById(id)
        let findDate = this.getSchedulesDatesById(findLes.pId);


        this.isInfoPopupVisible = true;

        this.date = findDate.date;
        this.time = findLes.time;
        this.lesson = findLes.lesson;
        this.auditor = findLes.auditor;
        this.shedulesDescription = findLes.shedulesDescription;
        this.repeat = findLes.repeat;
        this.group = findLes.group;
        this.pEdit = 1;

        this.editId = id;


      },
      changelesson() {
        let schedulesDates = this.schedulesDates;

        let findDate = this.schedulesDates.find(e => e.date === this.date);


        let findLes = this.getDescriptionsById(this.editId)

        let curDate =  this.schedulesDates.find(e => e.id === findLes.pId);

        let index = this.getDescriptionIndexByID(this.editId);
        this.Descriptions.splice(index, 1);

        if (findDate) {
          console.log(findDate.id);
          // let findLes = this.Descriptions.find(e => e.id === this.editId);
          this.Descriptions.push({

            time: this.time,
            id: findLes.id,
            pId: findDate.id,
            shedulesDescription: this.shedulesDescription,
            lesson: this.lesson,
            auditor: this.auditor,
            repeat: 0,
            group: "3360"

          });

        }
        else {
          let schedulesDate = {
            id: schedulesDates.length + 1,
            date: this.date
          };
          this.setSchedulesDates([schedulesDate].concat(schedulesDates));

          this.Descriptions.push({
            time: this.time,
            id: findLes.id,
            pId: schedulesDate.id,
            shedulesDescription: this.shedulesDescription,
            lesson: this.lesson,
            auditor: this.auditor,
            repeat: 0,
            group: "3360"

          });
        }


        let curDesc = this.Descriptions.find(e => e.pId === curDate.id);
        if (!curDesc){
          let curIndexDate = this.schedulesDates.findIndex(n => n.id === curDate.id);
          this.schedulesDates.splice(curIndexDate, 1);
        }

        this.isInfoPopupVisible = false;
      },
      deleteLesson(id) {
        let index = this.getDescriptionIndexByID(id);
        let curDescPid = this.Descriptions.find(e => e.id === id).pId;
        let curDate = this.schedulesDates.find(e => e.id === curDescPid);


        this.Descriptions.splice(index, 1);

        let descByPid = this.Descriptions.find(e => e.pId === curDescPid);
        if (!descByPid){
          let curIndexDate = this.schedulesDates.findIndex(n => n.id === curDate.id);
          this.schedulesDates.splice(curIndexDate, 1);
        }
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