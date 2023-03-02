<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <EventForm />
        <div class="btn btn-primary">CREATE EVENT</div>
      </div>
    </div>
    <div class="row">
      <div v-for="e in events" class="col-12 col-md-3 my-3">
        <EventCard :events="e" />
      </div>
    </div>
  </div>
</template>

<script>

import EventCard from "../components/EventCard.vue"
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { eventsService } from "../services/EventsService.js"
import { onMounted, computed } from "vue";
import { AppState } from "../AppState.js";


export default {
  setup() {

    async function get_all_events() {
      try {
        await eventsService.get_all_events()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    onMounted(() => {
      get_all_events()
      computed(() => AppState.account)
    })

    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
    }
  },
  components: { EventCard, }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
