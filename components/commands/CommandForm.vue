<template>
  <div>
    <a-form :form="form" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item>
            <a-card v-if="machine" title="Máquina selecionada:">
              <p><strong>SO: </strong>{{ machine.so }}</p>
              <p><strong>IP: </strong>{{ machine.ip }}</p>
              <p><strong>Usuário: </strong>{{ machine.user }}</p>
            </a-card>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Comandos">
            <a-select
              v-decorator="['command', {
                rules: [
                  {
                    required: true,
                    message: 'O campo comando é obrigatório'
                  }
                ]
              }]"
              placeholder="Escolha um comando"
            >
              <a-select-option value="reset">Resetar serviço</a-select-option>
              <a-select-option value="clear">Limpar cache</a-select-option>
              <a-select-option value="sync">Sincronizar dados</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Número de tentativas">
            <a-input-number
              v-decorator="[
                'attemps', {
                  type: 'number'
                }
              ]"
              style="width: 100%"
              :min="1"
              :max="10"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Dia da execução">
            <a-date-picker v-decorator="['date']" style="width: 100%" placeholder="Selecione o dia" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Hora da execução">
            <a-time-picker v-decorator="['hour']" style="width: 100%" placeholder="Selecione o horário" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Observação">
            <a-textarea
              v-decorator="['comment']"
              placeholder="Adicione alguma observação para o comando"
              :autosize="{ minRows: 2, maxRows: 6 }"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div
      :style="{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
      }"
    >
      <a-button :loading="loading" @click="save()" type="primary">Submit</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this),
      visible: false
    }
  },
  methods: {
    save () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.loading = true
          const commandsRef = this.$firebase.ref(`/machines/${this.machine.id}/commands`)
          const newCommandRef = commandsRef.push()
          newCommandRef.set(
            Object.keys(values).reduce((acc, key) => ({
              ...acc,
              ...(values[key] && { [key]: values[key] })
            }), {}),
            (error) => {
              this.loading = false
              this.form.resetFields()
              this.$emit('submit')
              if (error) {
                console.log(error)
                this.$notification.open({
                  message: 'Um error inesperado ocorreu!',
                  description: 'Tente novamente, caso o erro persista entre em contato com o suporte',
                  icon: <a-icon type="frown" style="color: #F73E20" />,
                  duration: 0
                })
              } else {
                this.$notification.open({
                  message: 'Comando cadastrado com sucesso',
                  description: 'O comando será executado no dia e horário escolhidos, caso uma data não tenha sido determinada, o comando será executado assim que possível',
                  icon: <a-icon type="smile" style="color: #20F73A" />,
                  duration: 0
                })
              }
            })
        }
      })
    }
  },
  props: ['machine']
}
</script>
