<template>
  <div class="about text-center text-light">
    <h1>{{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <h1 class="m-2 text-light">
    Your Events:
  </h1>
  <div class="d-flex flex-row">
    <div v-for="t in myTickets" class="mx-3">
      <EventCard :event="t.event[0]" />
      {{ t.eventId }}
    </div>
  </div>
</template>

<script>
import { computed, watchEffect, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from "../services/TicketsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup() {

    async function events_with_my_ticket() {
      try {
        await ticketsService.get_events_by_my_ticket()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    onMounted(() => {
      events_with_my_ticket();
    })


    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      myTickets: computed(() => AppState.myTickets),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
