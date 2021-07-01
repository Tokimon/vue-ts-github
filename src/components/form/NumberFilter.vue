<template>
  <div class="number-filter">
    <span class="label" @click="() => toggleInput()">
      <b class="value">{{ value }}</b>
      {{ label }}
    </span>

    <input
      type="range"
      min="10"
      max="50"
      step="5"
      v-show="showInput"
      :value="value"
      @input="change"
    >
  </div>
</template>

<style scoped>
  .number-filter {
    position: relative;
  }

  .label {
    font-size: 10px;
    cursor: pointer;
    color: gray;
  }

  .value {
    font-size: 14px;
    color: black;
  }

  input {
    position: absolute;
    top: 100%;
    left: 0;
  }
</style>

<script lang="ts">
  import { ref, defineComponent } from 'vue';
  
  import GithubIcon from '~/components/svg-icons/github-icon.vue';
  import Avatar from '~/components/atoms/Avatar.vue';



  export default defineComponent({
    name: 'ContributorListItem',
    props: {
      label: String,
      value: Number,
      onChange: Function
    },
    components: {
      Avatar,
      GithubIcon
    },
    data: () => ({
      timeoutToken: undefined as number | NodeJS.Timeout | undefined
    }),
    setup: () => ({
      showInput: ref(false)
    }),
    methods: {
      change(e: Event) {
        const target = e.target as HTMLInputElement;
        clearTimeout(this.timeoutToken as number | undefined);

        this.onChange && this.onChange(Number(target.value));
        this.timeoutToken = setTimeout(() => { this.toggleInput(false); }, 1000);
      },
      toggleInput(force?: boolean) {
        clearTimeout(this.timeoutToken as number | undefined);
        this.showInput = force ?? !this.showInput;
      }
    }
  });
</script>