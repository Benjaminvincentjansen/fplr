import React from "react";
import './SocialsFollow.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";


export default function SocialFollow() {
  return (
    <div className="social-container">
      <h3>Follow our socials for more fun FPL stats</h3>
<a href="https://www.twitter.com/fplplayers" className="twitter social">
  <FontAwesomeIcon icon={faTwitter} size="2x" />
</a>
<a href="https://www.instagram.com/fplplayers/"
  className="instagram social">
  <FontAwesomeIcon icon={faInstagram} size="2x" />
</a>
    </div>
  );
}