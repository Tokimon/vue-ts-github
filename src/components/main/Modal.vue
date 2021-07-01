<template>
  <div class="modal-overlay">
    <div class="backdrop" @click="close"></div>
    <div class="modal">
      <div
        class="close"
        role="button"
        aria-label="Close"
        tabindex="0"
        @click="close"
      >
        &times;
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    width: 80%;
    height: 80%;
    position: relative;
    display: flex;
    background: white;
    border-radius: 10px;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    background: silver;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    width: 18px;
    height: 18px;
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .close:hover, .close:focus {
    background: #be3939;
  }

  .content {
    margin: 25px;
    overflow: auto;
    flex: 1 1 100%;
  }

  .backdrop {
    background: rgba(0,0,0,0.3);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<script lang="ts">
  import { defineComponent } from 'vue';



  export default defineComponent({
    name: 'Modal',
    props: {
      onClose: Function
    },
    methods: {
      onEscape(e: KeyboardEvent) {
        e.code === 'Escape' && this.close();
      },
      close() {
        this.onClose && this.onClose();
      }
    },
    mounted() {
      window.addEventListener('keydown', this.onEscape, { passive: true });
    },
    beforeUnmount() {
      window.removeEventListener('keydown', this.onEscape);
    },
  });
</script>
