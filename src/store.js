import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cars: [{
      name: 'lada',
      id: 1
    }],
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
    ]
  },
  getters: {
    getCarsById: state => id => {
      return state.cars.filter(c => c.id === window.Number(id))[0] || null;
    },
    getSchedulesDatesById: state => id => {
      return state.schedulesDates.filter(c => c.id === window.Number(id))[0] || null;
    },
    getSchedulesDates: state => {
      return state.schedulesDates;
    },
    getshedulesDescriptionsById: state => id => {
      return state.shedulesDescriptions.filter(c => c.id === window.Number(id))[0] || null;
    }
  },
  mutations: {
    setCars(state, cars) {
      state.cars = cars;
    },
    setShedulesDescriptions(state, Descriptions) {
      state.shedulesDescriptions = Descriptions;
    },
    setSchedulesDatesById(state, Dates) {
      state.schedulesDates = Dates;
    }
  },
  // actions: {
  //   getDefaultCars() {
  //     return [{
  //       name: 'BMW',
  //       year: 1991
  //     }, {
  //       name: 'AUDI',
  //       year: 1990
  //     }]
  //   }
  // }
})
