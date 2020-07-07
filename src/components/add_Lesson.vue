<template>
  <div class="popup-wrapper" ref="popup-wrapper">
    <div class="v-popup" id="popup">
      <div class="v-popup__header">
        <span>Добавить занятие</span>
        <span>
          <i class="material-icons" @click="$emit('closePopup')">
             close
          </i>
        </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button class="close_modal" @click="$emit('closePopup')">
          Close
        </button>
        <button class="submit_btn" @click="$emit('AddLesson')">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "v-popup",
        data() {
            return {}
        },
        created() {
            const vm = this
            setTimeout(() => {
                document.addEventListener('click', vm.closePopup)
            })
        },
        destroyed() {
            const vm = this
            document.removeEventListener('click', vm.closePopup)
        },
        methods: {
            closePopup({target}) {
                if (!document.getElementById("popup").contains(target)) {
                    this.$emit('closePopup')
                }
            }
        }
    }
</script>

<style lang="scss">
  .v-popup {
    padding: 16px;
    position: fixed;
    top: 50px;
    width: 400px;
    background: #ffffff;
    box-shadow: 0 0 17px 0 #e7e7e7;

    &__header, &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__content {
      display: flex;
      flex-direction: column;

    }

    .submit_btn {
      padding: 8px;
      color: #ffffff;
      background: #26ae68;
    }

    .close_modal {
      padding: 8px;
      color: #ffffff;
      background: red;
    }
  }
</style>
