<template>
  <div class="card p-3">
    <router-link :to="{ name: 'Event', params: { id: events.id } }">
      <div class="d-flex flex-row">
        {{ events.name }}
      </div>
    </router-link>

  </div>
</template>


<script>
import { AppState } from "../AppState";
import { Event } from "../models/Event";
import { computed } from 'vue';

export default {
  props: {
    events: {
      type: Event,
      required: true
    },
  },
  setup() {
    const eventId = AppState.events.id
    return {
      eventId,
      account: computed(() => AppState.account)
    }
  }
}
</script>



<style lang="scss" scoped></style>