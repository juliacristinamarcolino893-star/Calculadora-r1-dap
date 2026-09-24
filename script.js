const FATOR_R1 = 0.9901;

const FATOR_DAP = 0.9982;

let numeroPeca = 0;

const tabelas = document.getElementById("tabelas");

function numero(valor) {

    if (valor === "") {

        return null;

    }

    const n = Number(
        String(valor).replace(",", ".")
    );

    return Number.isFinite(n) ? n : null;

}

function formatar(valor) {

    return (Math.floor(Math.abs(valor) * 100) / 100)
        .toFixed(2)
        .replace(".", ",");

}

function calcular(peca) {

    for (let i = 1; i <= 13; i++) {

        const ps = numero(
            document.getElementById(
                `ps-${peca}-${i}`
            ).value
        );

        const pm = numero(
            document.getElementById(
                `pm-${peca}-${i}`
            ).value
        );

        const r1Elemento = document.getElementById(
            `r1-${peca}-${i}`
        );

        const dapElemento = document.getElementById(
            `dap-${peca}-${i}`
        );


        // =========================
        // 1. CÁLCULO DO R1
        // =========================
        let resultadoR1 = null;

        if (ps !== null && pm !== null) {

            resultadoR1 =
                pm * FATOR_R1 - ps;

            r1Elemento.textContent =
                formatar(resultadoR1);

        } else {

            r1Elemento.textContent = "—";

        }


        // =========================
        // 2. CÁLCULO DO DAP
        // =========================
        if (
            ps !== null &&
            resultadoR1 !== null &&
            resultadoR1 !== 0
        ) {

            const resultadoDAP =
                (ps / resultadoR1) * FATOR_DAP;

            dapElemento.textContent =
                formatar(resultadoDAP);

        } else {

            dapElemento.textContent = "—";

        }

    }

}


function criarPeca() {

    numeroPeca++;

    const peca =
        document.createElement("section");

    peca.className = "peca";

    peca.dataset.peca =
        numeroPeca;


    let colunas = "";

    for (let i = 1; i <= 13; i++) {

        colunas += `
            <th>${i}</th>
        `;

    }


    let ps = "";

    let pm = "";

    let r1 = "";

    let dap = "";


    for (let i = 1; i <= 13; i++) {

        ps += `
            <td>

                <input
                    id="ps-${numeroPeca}-${i}"
                    inputmode="decimal"
                    placeholder="0,00"
                >

            </td>
        `;


        pm += `
            <td>

                <input
                    id="pm-${numeroPeca}-${i}"
                    inputmode="decimal"
                    placeholder="0,00"
                >

            </td>
        `;


        r1 += `
            <td
                id="r1-${numeroPeca}-${i}"
                class="resultado"
            >

                —

            </td>
        `;


        dap += `
            <td
                id="dap-${numeroPeca}-${i}"
                class="resultado"
            >

                —

            </td>
        `;

    }


    peca.innerHTML = `

        <h2>
            Peça ${numeroPeca}
        </h2>

        <table>

            <tr>

                <th></th>

                ${colunas}

            </tr>


            <tr>

                <th>P.S</th>

                ${ps}

            </tr>


            <tr>

                <th>P.M</th>

                ${pm}

            </tr>


            <tr>

                <th>R1</th>

                ${r1}

            </tr>


            <tr>

                <th>DAP</th>

                ${dap}

            </tr>

        </table>


        <div class="rodape">

            Se R1 aparecer em vermelho/negativo,
            confira a fórmula e os pesos com o
            procedimento da empresa.

        </div>

    `;


    tabelas.appendChild(peca);


    peca
        .querySelectorAll("input")
        .forEach(input => {

            input.addEventListener(
                "input",
                () => calcular(peca.dataset.peca)
            );

        });

}


document
    .getElementById("addPeca")
    .addEventListener(
        "click",
        criarPeca
    );


document
    .getElementById("limpar")
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Apagar todos os valores?"
                )
            ) {

                tabelas.innerHTML = "";

                numeroPeca = 0;

                criarPeca();

            }

        }
    );


document
    .getElementById("imprimir")
    .addEventListener(
        "click",
        () => {

            window.print();

        }
    );


criarPeca();

criarPeca();