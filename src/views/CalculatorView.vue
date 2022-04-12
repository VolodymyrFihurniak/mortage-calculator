<template>
  <div class="calculator">
    <CalculatorForm />
  </div>
</template>

<script>
import CalculatorForm from '@/components/CalculatorForm.vue'
export default {
  data() {
    return {
      calculator: {
        result: 0,
        firstNumber: 0,
        secondNumber: 0,
        operator: '',
      },
    }
  },
  components: {
    CalculatorForm,
  },
}
</script>

<style scoped>
.calculator {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: #2c3e50;
  border-radius: 1rem;
  min-height: 25rem;
}
</style>