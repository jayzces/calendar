<template>
    <div class="reserve-popup">
        <section class="popup">
            <header class="popup__title">RESERVE GAGFA RM 1404</header>

            <button class="popup__close"
                @click="closePopup">&times;</button>

            <form>
                <section class="field">
                    <header>Time</header>
                    <div class="row">
                        <div>
                            <label>Start Time</label>
                            <input type="time" />
                        </div>
                        <span>to</span>
                        <div>
                            <label>End Time</label>
                            <input type="time" />
                        </div>
                    </div>
                </section>
                <section class="field">
                    <header>Purpose</header>
                    <textarea rows="4"></textarea>
                </section>
                <section class="field">
                    <header>Remarks</header>
                    <textarea rows="4"></textarea>
                </section>
            </form>

            <p class="note">* All fields are required</p>

            <div class="buttons">
                <button @click="closePopup">Request</button>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'ReservePopup',
        methods: {
            closePopup() {
                this.$emit('closePopup')
            }
        }
    }
</script>

<style>
    .reserve-popup {
        background-color: hsla(0, 0%, 0%, 0.25);
        position: fixed;
        display: grid;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
    }

    .popup {
        background-color: white;
        position: relative;
        margin: auto;
        padding: 36px;
        width: 480px;
    }

    .popup__title {
        font-weight: bold;
        font-size: 20px;
    }

    .popup__close {
        background-color: transparent;
        position: absolute;
        padding: 0;
        top: 16px;
        right: 16px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        font-size: 16px;
        color: hsla(0, 0%, 0%, 0.54);
        border-radius: 20px;
        border: 0;
        cursor: pointer;
    }

    .popup__close:hover,
    .popup__close:focus {
        background-color: var(--warning);
        color: white;
        outline: 0;
    }

    form {
        margin-top: 24px;
    }

    .field:not(:first-child) {
        margin-top: 16px;
    }

    .field header {
        font-weight: bold;
    }

    .row {
        display: flex;
        align-items: center;
        color: hsla(0, 0%, 0%, 0.38);
    }

    .row > div {
        width: 50%;
    }

    .row > div:first-child {
        margin-right: 16px;
    }

    .row > div:last-child {
        margin-left: 16px;
    }

    .row label {
        font-size: 14px;
    }

    .row input,
    textarea {
        display: block;
        border: 1px solid hsla(0, 0%, 0%, 0.12);
        border-radius: 4px;
    }

    .row input {
        margin: 2px 0 0;
        width: calc(100% - (16px * 2));
        padding: 8px 16px;
    }

    textarea {
        margin-top: 8px;
        padding: 8px;
        resize: none;
        width: calc(100% - (8px * 2));
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    .row span {
        margin-top: 12px;
    }

    .note {
        margin: 8px 0 0;
        font-style: italic;
        font-size: 14px;
        color: var(--warning);
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
    }

    .buttons button {
        background-color: var(--accent);
        display: block;
        margin: 0;
        width: 200px;
        height: 44px;
        line-height: 44px;
        font-family: inherit;
        font-weight: bold;
        font-size: inherit;
        text-transform: uppercase;
        color: white;
        border: 0;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
