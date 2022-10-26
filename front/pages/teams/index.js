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
import TeamService from "../../src/services/TeamService";
import { Container } from "@mui/system";

function TeamList() {
  const { router } = useRouter();
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteTeam = (team) => {
    var accepted = confirm(`Você realmente gostaria de deletar o artigo: ${team.title}`);
    if (!accepted) return;

    setIsLoading(true);
    TeamService.destroy(team.id)
      .then((data) => {
        getTeams().then(() => {
          setIsLoading(false);
          toast.success("Team destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying team: ${e.message}`);
      });
  };

  const getTeams = async () => {
    let data = await TeamService.getAll();
    setTeams(data);
  };

  useEffect(() => {
    getTeams().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>
      <Grid container mt={2}>
        <Grid xs={6}>
          <Typography variant="h4">Teams List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.teams.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                New Team
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
                {/* <th>Actual Team</th> */}
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => {
                return (
                  <tr key={team.id}>
                    <td>{team.id}</td>
                    <td>{team.name}</td>
                    <td>{team.age}</td>
                    <td>{team.height}</td>
                    <td>{team.position}</td>
                    <td>{team.foot}</td>
                    {/* <td>{team.team.name}</td> */}
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.teams.show,
                          query: {
                            id: team.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.teams.edit,
                          query: {
                            id: team.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteTeam(team)}>
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

export default TeamList;
