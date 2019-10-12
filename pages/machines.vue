<template>
  <div>
    <h1>Máquinas</h1>
    <a-table :loading="loadingMachines" :columns="columns" :data-source="machines">
      <div
        slot-scope="so"
        slot="so"
        class="icon-wrapper"
      >
        <a-icon :type="getSOIcon(so)" />
      </div>
      <div slot="actions" slot-scope="id">
        <a-button type="primary" @click="setCurrentMachine(id)">
          <a-icon type="plus" />
          Agendar comando
        </a-button>
        <a-drawer
          title="Agendar comando"
          :width="720"
          :visible="!!currentMachine"
          @close="setCurrentMachine()"
          :wrapStyle="{
            height: 'calc(100% - 108px)',
            overflow: 'auto',
            paddingBottom: '108px'
          }"
        >
          <CommandForm :machine="currentMachine" @submit="setCurrentMachine()" />
        </a-drawer>
      </div>
    </a-table>
  </div>
</template>

<script>
import CommandForm from '~/components/commands/CommandForm'

const columns = [
  {
    title: 'SO',
    dataIndex: 'so',
    key: 'so',
    scopedSlots: { customRender: 'so' }
  },
  { title: 'IP', dataIndex: 'ip', key: 'ip' },
  { title: 'Usuário', dataIndex: 'user', key: 'user' },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'actions' }
  }
]

export default {
  components: {
    CommandForm
  },
  mounted () {
    this.loadingMachines = true
    this.$firebase.ref('/machines').on('value', (snap) => {
      this.loadingMachines = false
      const machines = snap.val()
      console.log(machines)
      this.machines = machines
    })
  },
  data () {
    return {
      machines: [],
      currentMachine: null,
      loadingMachines: false,
      columns,
      showDetails: false
    }
  },
  methods: {
    setCurrentMachine (id) {
      console.log(id)
      this.currentMachine = this.machines.find(machine => machine.id === id) || null
    },
    getSOIcon (SOName) {
      const SOIcons = {
        linux: 'qq',
        apple: 'apple',
        windows: 'windows'
      }
      return SOIcons[SOName]
    }
  }
}
</script>

<style lang="sass">
.icon-wrapper
  font-size: 23px
</style>
