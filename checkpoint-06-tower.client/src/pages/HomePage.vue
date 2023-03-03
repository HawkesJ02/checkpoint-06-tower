<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <EventForm />
      </div>
      <div class="col-12">
        <div class="bg-primary rounded p-3 d-flex justify-content-around">
          <button @click="change_filter('')" class="btn btn-outline-light">All</button>
          <button @click="change_filter('sport')" class="btn btn-outline-light">Sport</button>
          <button @click="change_filter('digital')" class="btn btn-outline-light">Digital</button>
          <button @click="change_filter('convention')" class="btn btn-outline-light">Convention</button>
          <button @click="change_filter('concert')" class="btn btn-outline-light">Concert</button>
        </div>
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
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState.js";


export default {
  setup() {
    const filter = ref('')
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
      events: computed(() => {
        if (!filter.value) {
          return AppState.events
        }
        else {
          return AppState.events.filter(e => e.type == filter.value)
        }
      }),

      change_filter(type) {
        filter.value = type
      }

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
