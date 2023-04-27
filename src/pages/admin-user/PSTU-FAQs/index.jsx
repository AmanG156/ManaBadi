import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import { useTranslation } from 'react-i18next';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from './style';
import useStyles from '../../../custom-hooks/useStyles';

export default function SimpleAccordion() {
  const [expanded, setExpanded] = React.useState('panel1');
  const { t } = useTranslation('translation');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const classes = useStyles(style)();
  return (
    <div className={classes.pstuAccordion}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"

        >
          <Typography><strong>{t('PSTU_FAQS.PSTU_FAQ1.QUESTION')}</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ1.ANSWER1')}
            <br />
            {t('PSTU_FAQS.PSTU_FAQ1.ANSWER2')}
            <br />
            {t('PSTU_FAQS.PSTU_FAQ1.ANSWER3')}
            <ul>
              <li><strong>{t('PSTU_FAQS.PSTU_FAQ1.ANSWER4')}</strong></li>
              <li><strong>{t('PSTU_FAQS.PSTU_FAQ1.ANSWER5')}</strong></li>
              <li><strong>{t('PSTU_FAQS.PSTU_FAQ1.ANSWER6')}</strong></li>
              <li><strong>{t('PSTU_FAQS.PSTU_FAQ1.ANSWER7')}</strong></li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography><strong>{t('PSTU_FAQS.PSTU_FAQ2.QUESTION')}</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ2.ANSWER1')}
            <br />
            {t('PSTU_FAQS.PSTU_FAQ2.ANSWER2')}
            {' '}
            <u>{t('PSTU_FAQS.PSTU_FAQ2.ANSWER3')}</u>
            {' '}
            {t('PSTU_FAQS.PSTU_FAQ2.ANSWER4')}
            <br />

            {t('PSTU_FAQS.PSTU_FAQ2.ANSWER5')}
            <strong>
              <u>{t('PSTU_FAQS.PSTU_FAQ2.ANSWER6')}</u>

            </strong>
            <br />
            <ul>
              <li>{t('PSTU_FAQS.PSTU_FAQ2.ANSWER7')}</li>
              <li>{t('PSTU_FAQS.PSTU_FAQ2.ANSWER8')}</li>
            </ul>
            <br />
            {t('PSTU_FAQS.PSTU_FAQ2.ANSWER9')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><strong>{t('PSTU_FAQS.PSTU_FAQ3.QUESTION')}</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ3.ANSWER1')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography><strong>{t('PSTU_FAQS.PSTU_FAQ4.QUESTION')}</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ4.ANSWER1')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >

          <Typography><strong>{t('PSTU_FAQS.PSTU_FAQ5.QUESTION')}</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ5.ANSWER1')}
            <br />
            {t('PSTU_FAQS.PSTU_FAQ5.ANSWER2')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6a-content"
          id="panel6a-header"
        >

          <Typography>
            <strong>
              {t('PSTU_FAQS.PSTU_FAQ6.QUESTION')}
            </strong>

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ6.ANSWER1')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7a-content"
          id="panel7a-header"
        >

          <Typography>
            <strong>
              {t('PSTU_FAQS.PSTU_FAQ7.QUESTION')}
            </strong>

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ7.ANSWER1')}
            <br />
            <ul>
              <li>
                {t('PSTU_FAQS.PSTU_FAQ7.ANSWER2')}
              </li>
              <li>
                {t('PSTU_FAQS.PSTU_FAQ7.ANSWER3')}

              </li>
              <li>{t('PSTU_FAQS.PSTU_FAQ7.ANSWER4')}</li>
              <li>{t('PSTU_FAQS.PSTU_FAQ7.ANSWER5')}</li>
              <li>{t('PSTU_FAQS.PSTU_FAQ7.ANSWER6')}</li>
              <li>{t('PSTU_FAQS.PSTU_FAQ7.ANSWER7')}</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9a-content"
          id="panel9a-header"
        >

          <Typography>
            <strong>
              {t('PSTU_FAQS.PSTU_FAQ8.QUESTION')}
            </strong>

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ8.ANSWER1')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel10a-content"
          id="panel10a-header"
        >

          <Typography>
            <strong>
              {t('PSTU_FAQS.PSTU_FAQ9.QUESTION')}
            </strong>

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ9.ANSWER1')}
            <br />
            {t('PSTU_FAQS.PSTU_FAQ9.ANSWER2')}
            <strong>{t('PSTU_FAQS.PSTU_FAQ9.ANSWER3')}</strong>
            <br />
            {t('PSTU_FAQS.PSTU_FAQ9.ANSWER4')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel11a-content"
          id="panel11a-header"
        >

          <Typography>
            <strong>
              {t('PSTU_FAQS.PSTU_FAQ10.QUESTION')}
            </strong>

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ10.ANSWER1')}
            <ul>
              <li>{t('PSTU_FAQS.PSTU_FAQ10.ANSWER2')}</li>
              <li>{t('PSTU_FAQS.PSTU_FAQ10.ANSWER3')}</li>
              <li>{t('PSTU_FAQS.PSTU_FAQ10.ANSWER4')}</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel12a-content"
          id="panel12a-header"
        >

          <Typography>
            <strong>
              {t('PSTU_FAQS.PSTU_FAQ11.QUESTION')}
            </strong>

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              <li>{t('PSTU_FAQS.PSTU_FAQ11.ANSWER1')}</li>
              <li>{t('PSTU_FAQS.PSTU_FAQ11.ANSWER2')}</li>
              <li>
                {t('PSTU_FAQS.PSTU_FAQ11.ANSWER3')}

              </li>
              <li>{t('PSTU_FAQS.PSTU_FAQ11.ANSWER4')}</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel13a-content"
          id="panel13a-header"
        >

          <Typography>
            <strong>
              {t('PSTU_FAQS.PSTU_FAQ12.QUESTION')}
            </strong>

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ12.ANSWER1')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel14a-content"
          id="panel14a-header"
        >

          <Typography>
            <strong>
              {t('PSTU_FAQS.PSTU_FAQ13.QUESTION')}
            </strong>

          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {t('PSTU_FAQS.PSTU_FAQ12.ANSWER1')}
            <br />
            {t('PSTU_FAQS.PSTU_FAQ13.ANSWER2')}
            {' '}
            <strong>{t('PSTU_FAQS.PSTU_FAQ13.ANSWER3')}</strong>
            {' '}
            {t('PSTU_FAQS.PSTU_FAQ13.ANSWER4')}
            {' '}
            <strong>{t('PSTU_FAQS.PSTU_FAQ13.ANSWER5')}</strong>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
