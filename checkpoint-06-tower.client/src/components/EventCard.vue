<template>
  <div v-if="event?.id" class="card">
    <router-link :to="{ name: 'Event', params: { id: event.id } }">
      <div class="">
        <img v-if="event.isCanceled == false" class="event-img" :src="event.coverImg" alt="">
        <img v-else class="event-img-c" :src="event.coverImg" alt="">
        {{ event.name }}
        {{ event.location }}
        {{ event.startDate }}
        {{ event.capacity }}

      </div>
    </router-link>

  </div>
</template>


<script>
import { AppState } from "../AppState";
import { Event } from "../models/Event";
import { computed } from 'vue';
import { useRoute } from "vue-router";

export default {
  props: {
    event: {
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