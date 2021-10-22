import Head from 'next/head'
import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
//import { Button } from '@material-ui/core';

function FormComponent() {
    const [binaryText, setBinaryText] = useState('')
    const [decimalText, setDecimalText] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onFormSubmit = e => {
        console.log(e);
        /**
         * Prevenindo que a nossa aplicação recarregue
         */
        e.preventDefault()
    
        /**
         * Garantindo que estamos recebendo 0 ou 1
         */
        if (binaryText.match(/^[0-1]+$/g) === null) {
          setErrorMessage('Enter either 0 or 1')
          return
        }

        /**
         * Formula
         * input = 1 => output = 1 * (2^0) = 1
         * input = 10 => output = (0 * (2^0)) + (1 * (2^1)) = 2
         * Inverte e itera de trás para frente
         * Isto pode sofrer alteração em commits futuros
         */
        const reversedBinaryText = binaryText
        .split('')
        .map(Number)
        .reverse()

        /**
         * Reseta a mensagem de erro
         */
        setErrorMessage('') 

        /**
         * Calcula o resultado somando ao valor anterior
         */
        const result = reversedBinaryText.reduce(
            (accumulator, currentValue, idx) => accumulator + currentValue * Math.pow(2, idx)
        )
        setDecimalText(result)
    }
    return (
        
        <form onSubmit={onFormSubmit}>
            <Head>
                <title>Binary to Decimal</title>
                <meta name="description" content="Convert binary to decimal API" />
                <div className={styles.header}>
                    <h1>Binary to Decimal Converter</h1>
                </div>
            </Head>

            <main>
                <div className={styles.formulario}>
                    {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                    <br />
                    <div className={styles.binaryImput}>
                        <span>Binary Input</span>
                        <div className={styles.binaryImput}>
                            <input
                            autoComplete="off"
                            type="text"
                            name="binary"
                            placeholder="Enter 0 or 1"
                            value={binaryText}
                            onChange={e => setBinaryText(e.target.value)}
                            />
                            <button type="submit">Convert</button>
                        </div>
                    </div>
                    <div className={styles.decimalOutput}>
                        <span>Decimal Output</span>
                        <input
                            type="text"
                            name="decimal"
                            value={decimalText}
                            disabled
                        />
                    </div>
                </div>
            </main>
        </form>
    )
}

export default FormComponent