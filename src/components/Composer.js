import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownload from '@material-ui/icons/CloudDownload';
import LinearProgress from '@material-ui/core/LinearProgress';
import API from '../services/api';
import IconButton from '@material-ui/core/IconButton';

export default class Composer extends Component {

    state = {
        loading: false,
        num: 0,
        files: [],
        data: []
    };

    render() {
        const { loading, data } = this.state;
        return (
            <div className="Composer">
                {
                    loading ? <LinearProgress color="secondary" /> : null
                }
                <Grid container spacing={16} className='container'>
                    <Grid item xs={12}>
                        <Typography variant="h5" className='heading'>Upload files</Typography>
                        <DropzoneArea filesLimit={10}
                                      acceptedFiles={[]}
                                      dropzoneText={'Drag and drop files here or click to select'}
                                      onChange={this.onChange}
                                      onDrop={this.onDrop}
                                      onDelete={this.onDelete} />
                    </Grid>
                    {
                        data.length ?
                        <Grid item xs={12}>
                            <Typography variant="h6" className='heading'>Result</Typography>
                            <div>
                                <List>
                                    {
                                        data.map((file, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <ListItemIcon>
                                                        <IconButton color="primary" href={file.uri}>
                                                            <CloudDownload />
                                                        </IconButton>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={file.name}
                                                        secondary={null}
                                                    />
                                                </ListItem>
                                            );
                                        })
                                    }
                                </List>
                            </div>
                        </Grid> : null
                    }
                </Grid>
            </div>
        );
    }

    onChange = (files = []) => {
        this.setState({
            files: files
        });
    };

    onDrop = (files = []) => {
        this.setState({
            loading: true
        });

        Promise.all((files.length ? files : [files]).map((file, index) => {
            return API.getZipUrl(file).then((data) => {
                console.log(data);

                // TODO
                this.setState({
                    data: [
                        ...this.state.data,
                        {
                            uri: 'https://......',
                            name: this.state.files[index].name
                        }
                    ]
                });

                return data;
            });
        })).then(() => {
            this.setState({
                loading: false
            });
        });
    };

    onDelete = (file = {}) => {
        // TODO
    };
}
