<template>
	<main class="content">
		<div class="edit">
			<MyInput />
			<ResultMessage />
			<MySubmit />
		</div>
		<div class="result">
			<MyTable />
		</div>
	</main>
</template>

<script setup>
import MyInput from './components/my-input.vue';
import MyTable from './components/my-table.vue';
import MySubmit from './components/my-submit.vue';
import ResultMessage from './components/result-message.vue';

</script>

<style scoped>
.content {
	@apply lg:flex;
}
.edit {
	@apply w-full lg:min-h-screen p-4;
}

.result {
	@apply w-full;
}
</style>
