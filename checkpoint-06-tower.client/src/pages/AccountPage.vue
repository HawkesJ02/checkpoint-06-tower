<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div>

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

    async function get_events_by_my_ticket() {
      try {
        const ticketId = AppState.account.id
        await ticketsService.get_events_by_my_ticket(ticketId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    onMounted(() => {
      get_events_by_my_ticket();
    })


    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
