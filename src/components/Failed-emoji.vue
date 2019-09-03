<template>
    <div
            class="d-flex justify-center items-center fill-height"
    >
        <svg
                id="failed-emoji"
                class="failed-emoji"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 250 250"
        >
            <circle
                    id="face"
                    class="face"
                    cx="125"
                    cy="125"
                    r="125"
            />
            <ellipse
                    id="left-eye"
                    class="eye"
                    cx="75"
                    cy="87.5"
                    rx="21.07"
                    ry="16.5"
            />
            <ellipse
                    id="right-eye"
                    class="eye"
                    cx="175"
                    cy="87.5"
                    rx="21.07"
                    ry="16.5"
            />
            <path
                    id="mouth"
                    class="mouth"
                    d="M189.6,190.13c.06-.57.16-1.18.17-1.72l-.82-.81L187.31,186l-3.44-3.05c-1.2-.95-2.38-1.93-3.59-2.86s-2.47-1.81-3.73-2.67a87.08,87.08,0,0,0-16.1-8.6A89.51,89.51,0,0,0,143,163.63a94.24,94.24,0,0,0-18-1.72l-4.53.1-4.53.32-4.51.52c-1.49.21-3,.5-4.47.75a89.49,89.49,0,0,0-17.46,5.08,86.52,86.52,0,0,0-16.13,8.62c-1.25.88-2.47,1.8-3.71,2.7s-2.38,1.93-3.56,2.91L62.71,186l-1.62,1.63a2.12,2.12,0,0,0-.72,2.46h0A2.73,2.73,0,1,1,57,188.17a2.67,2.67,0,0,1,1.19,0,2.24,2.24,0,0,0,2.5-.84l1.6-1.66,3.38-3.15,3.53-3c1.22-.94,2.42-1.92,3.66-2.83a92.65,92.65,0,0,1,15.91-9.52A88.4,88.4,0,0,1,106.42,161c1.53-.3,3-.65,4.59-.9s3.09-.49,4.64-.66,3.11-.27,4.67-.38l4.68-.15A88,88,0,0,1,143.59,161a88.93,88.93,0,0,1,17.65,6,91.17,91.17,0,0,1,15.93,9.54c1.24.93,2.44,1.91,3.65,2.86s2.33,2,3.5,3l3.33,3.21,1.58,1.68.79.85c.55,0,1.19-.06,1.78-.08a2.29,2.29,0,1,1-2.21,2.35,2.62,2.62,0,0,1,0-.28Z"
            />
            <path
                    id="tear"
                    class="tear"
                    d="M193.78,87.5c-4.42,5.74-6.59,13.18-5.66,16.85,1.35,5.34,9.75,4.81,11-1.54C199.85,98.77,197.79,92,193.78,87.5Z"
            />
        </svg>
    </div>
</template>

<script>
    export default {
        name: "Failed-emoji"
    }
</script>

<style scoped>
    .failed-emoji {
        width: 250px;
    }

    .face {
        fill: #fa4f23;
    }

    .eye,
    .mouth {
        fill: #352624;
    }

    .tear {
        fill: #fff;
        transform-origin: 193.78px 87.5px;
        animation: tear-drop 3s infinite ease-out;
    }

    @keyframes tear-drop {
        0% {
            transform: scale(0, 0) translate(0, 0);
            opacity: 0;
        }
        20% {
            transform: scale(0.5, 0.5) translate(0, 25px);
            opacity: 1;
        }
        100% {
            transform: scale(0.5, 1.1) translate(0, 45px);
            opacity: 0;
        }
    }
</style>
