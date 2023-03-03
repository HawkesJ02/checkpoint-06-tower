<template>
  <div class="card">
    <router-link :to="{ name: 'Event', params: { id: events.id } }">
      <div class="">
        <img v-if="events.isCanceled == false" class="event-img" :src="events.coverImg" alt="">
        <img v-else class="event-img-c" :src="events.coverImg" alt="">
        {{ events.name }}
        {{ events.location }}
        {{ events.startDate }}
        {{ events.capacity }}
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

.event-img-c {
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  filter: blur(6px);
}
</style>