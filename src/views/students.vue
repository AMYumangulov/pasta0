<template>
  <div id="students">
    <button @click="submit">addToStore</button>
    <h2>студенты</h2>
    <div>
      {{getCarsById(1)}} {{getSchedulesDatesById(2)}}
    </div>
    <div v-for="date in getSchedulesDates" :key="date.id">
      {{date}}
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations, mapGetters} from "vuex";

  export default {
    name: 'students',
    computed: {
      ...mapState({
        cars: 'cars',
        schedulesDates: 'schedulesDates',
        shedulesDescriptions: 'shedulesDescriptions'
      }),
      ...mapGetters({
        getCarsById: 'getCarsById',
        getSchedulesDatesById: 'getSchedulesDatesById',
        getSchedulesDates: 'getSchedulesDates'
      })
    },
    data: () => {
      return {
        title: '',
        contacts: [{name: 'Denis'}, {name: 'Danil'}],
        description: ''
      }
    },
    created() {
      // this.setCars([
      //   {
      //     name: 'denis'
      //   }
      // ]);
      // this.getDefaultCars().then(cars => {
      //   this.setCars(cars);
      // })
    },
    methods: {
      ...mapActions({
        getDefaultCars: 'getDefaultCars'
      }),
      ...mapMutations({
        setCars: 'setCars',
        setSchedulesDatesById: 'setSchedulesDatesById'
      })
      ,
      submit() {
        const schedulesDates = this.schedulesDates;
        const schedulesDate = {
          id: schedulesDates.length + 1,
          date: '2020-17-02'
        };

        this.setSchedulesDatesById([schedulesDate].concat(schedulesDates));

      }
    }
  }
</script>