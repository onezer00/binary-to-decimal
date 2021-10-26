import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';

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
        
        <form onSubmit={onFormSubmit} className={styles.background}>
            <div>
                <title>Binary to Decimal</title>
                <meta name="description" content="Convert binary to decimal API" />
                <div className={styles.header}>
                    <h1>Binary to Decimal Converter</h1>
                </div>
            </div>

            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            
            <main className={styles.pageForm}>
                <div className={styles.formulario}>
                    {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                    <br />
                    <div className={styles.titleText}>
                        Binary Input
                        </div>
                    <div className={styles.binaryImput}>
                        <div className={styles.binaryImput}>
                            <input
                            autoComplete="off"
                            type="text"
                            name="binary"
                            placeholder="Enter 0 or 1"
                            value={binaryText}
                            onChange={e => setBinaryText(e.target.value)}
                            />
                            <div>
                                <button type="submit">Convert</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.titleText}>
                        Decimal Output
                    <div className={styles.decimalOutput}>
                        <input
                            type="text"
                            name="decimal"
                            value={decimalText}
                            disabled
                        />
                    </div>
                    </div>
                </div>
            </main>
            <footer className={styles.footer}>
                Designed
                <span>💜</span> by
                <a href="https://github.com/onezer00" target="_blank">GitHub </a> || or @
                <a href="https://www.instagram.com/oner.oficial/" target="_blank">Instagran</a>
            </footer>
        </form>
    )
}

export default FormComponent