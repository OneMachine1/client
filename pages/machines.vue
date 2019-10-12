<template>
  <div>
    <h1>Máquinas</h1>
    <a-table :columns="columns" :data-source="machines">
      <div
        slot-scope="so"
        slot="so"
        class="icon-wrapper"
      >
        <a-icon :type="so" />
      </div>
      <div slot="actions">
        <CommandForm />
        <CommandForm />
      </div>
    </a-table>
  </div>
</template>

<script>
import CommandForm from '~/components/commands/CommandForm'

const columns = [
  {
    title: 'S.O.',
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
    this.$firebase.ref('/machines').on('value', (snap) => {
      const machines = snap.val()
      console.log(machines)
      this.machines = machines
    })
  },
  data () {
    return {
      machines: [],
      columns,
      showDetails: false
    }
  }
}
</script>

<style lang="sass">
.icon-wrapper
  font-size: 23px
</style>
