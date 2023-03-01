<template>
  <div class="card p-3">
    <div class="d-flex flex-row">
      {{ event }}
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { Event } from "../models/Event";

export default {
  props: {
    event: {
      type: Event,
      required: true
    },
  },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>



<style lang="scss" scoped></style>