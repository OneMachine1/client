<template>
  <div>
    <h1>Máquinas</h1>
    <a-table :columns="columns" :data-source="data">
      <div
        class="icon-wrapper"
        slot-scope="so"
        slot="so"
      >
        <a-icon :type="so" />
      </div>
      <div slot="actions">
        <CommandForm />
        <CommandForm />
      </div>
      <p>{{ data.name }}</p>
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

const data = Array.from({ length: 6 }).map((_, index) => ({
  id: +index,
  so: 'windows',
  ip: '123.345.678.890',
  user: 'Carlos José'
}))

export default {
  components: {
    CommandForm
  },
  data () {
    return {
      data,
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
