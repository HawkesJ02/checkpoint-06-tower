<template>
  <div class="card event-img">
    <router-link :to="{ name: 'Event', params: { id: events.id } }">
      <div class="">
        <img :src="events.coverImg" alt="">
        {{ events.name }}
        {{ events.location }}
        {{ events.startDate }}
        {{ events.capacity }}
        <div v-if="events.isCanceled == true"> EVENT IS DEAD AAAA</div>
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



<style lang="scss" scoped>
.event-img {
  height: 100%;
  width: 100%;
  object-fit: cover;

  overflow: hidden;
}
</style>