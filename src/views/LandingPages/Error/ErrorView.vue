<template>
    <div>
        <h1>404 - Page Not Found</h1>
        <p>
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
        </p>
        <router-link to="/">Return Home</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFoundView'
};
</script>
