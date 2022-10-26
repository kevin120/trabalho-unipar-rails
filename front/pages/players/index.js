import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Libs
import { Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internals
import ROUTES from "../../src/config/routes";
import PlayerService from "../../src/services/PlayerService";
import { Container } from "@mui/system";

function PlayerList() {
  const { router } = useRouter();
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deletePlayer = (player) => {
    var accepted = confirm(`Você realmente gostaria de deletar o artigo: ${player.title}`);
    if (!accepted) return;

    setIsLoading(true);
    PlayerService.destroy(player.id)
      .then((data) => {
        getPlayers().then(() => {
          setIsLoading(false);
          toast.success("Player destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying player: ${e.message}`);
      });
  };

  const getPlayers = async () => {
    let data = await PlayerService.getAll();
    setPlayers(data);
  };

  useEffect(() => {
    getPlayers().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>
      <Grid container mt={2}>
        <Grid xs={6}>
          <Typography variant="h4">Players List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.players.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                New Player
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid xs={12}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Height</th>
                <th>Position</th>
                <th>Best Foot</th>
                <th>Actual Team</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => {
                return (
                  <tr key={player.id}>
                    <td>{player.id}</td>
                    <td>{player.name}</td>
                    <td>{player.age}</td>
                    <td>{player.height}</td>
                    <td>{player.position}</td>
                    <td>{player.foot}</td>
                    <td>{player.team.name}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.players.show,
                          query: {
                            id: player.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.players.edit,
                          query: {
                            id: player.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deletePlayer(player)}>
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PlayerList;
