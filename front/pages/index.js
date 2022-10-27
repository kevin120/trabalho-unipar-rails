import { Button } from "@mui/material";
import Link from "next/link";
import styles from '../styles/Home.module.css';
import ROUTES from "../src/config/routes";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

export default function Home() {
  return (
    <>
      <h2>Trabalho da matéria de Ruby</h2>
      <p className={styles['bold']}>Desenvolvido por:</p>
      <div>
        <ul>
          <li>00179845 - Adriel Marcelo Schneider</li>
          <li>00174333 - Kévin Bezerra dos Santos</li>
        </ul>
      </div>

      <p className={styles['bold']}>Resumo do Projeto:</p>
      <div>
        <p>
          Nosso projeto foi desenvolvido baseado em um cadastro de jogadores. <br /><br />
          Cada jogador é ligado á uma equipe.<br /><br />
          Clique nos botões abaixo para acessar os menus disponíveis<br />
        </p>

      </div>
      <div>
        <p>
          <Link
            href={{
              pathname: ROUTES.teams.list,
            }}
          >
            <Button variant="contained" color="info" size="small">
              <GroupIcon fontSize="small" /> Listagem de Times
            </Button>
          </Link>
        </p>

        <p>
          <Link
            href={{
              pathname: ROUTES.players.list,
            }}
          >
            <Button variant="contained" color="info" size="small">
              <PersonIcon fontSize="small" /> Listagem de Jogadores
            </Button>
          </Link>
        </p>
      </div>
    </>
  )
}
